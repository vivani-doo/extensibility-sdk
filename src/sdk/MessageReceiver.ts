import { DiagnosticContext } from '../context/DiagnosticContext';
import { HostContext } from '../context/HostContext';
import { InitializationContext } from '../context/InitializationContext';
import { MeetContext } from '../context/MeetContext';
import runtime from '../context/RuntimeContext';
import { SessionContext } from '../context/SessionContext';
import { UserContext } from '../context/UserContext';
import { PredefinedLocale } from '../enums/PredefinedLocale';
import { PredefinedMeetingState } from '../enums/PredefinedMeetingState';
import { PredefinedTheme } from '../enums/PredefinedTheme';
import { EventOrigin } from '../logging/EventOrigin';
import { EventType } from '../logging/EventType';
import logger from '../logging/Logger';
import { LogLevel } from '../logging/LogLevel';
import { HostEventDiagnosticMessage } from '../messages/host/HostEventDiagnosticMessage';
import { HostEventInitMessage } from '../messages/host/HostEventInitMessage';
import { Message } from '../messages/Message';
import { MessageType } from '../messages/MessageType';
import { validHostOrigin } from './utils';

export class MessageReceiver {
  /**
   * Creates an instance of MessageReceiver.
   * @param {(cxt: InitializationContext) => void} onInit
   * @param {(context: LoadingContext) => void} onLoad
   * @memberof MessageReceiver
   */
  constructor(
    private onInit: (cxt: InitializationContext) => void,
    private onLoad: (context: DiagnosticContext) => void,
  ) {}

  public handleReceivedMessage = (messageEvent: MessageEvent) => {
    const addonMessage = this.getAddonMessage(messageEvent);
    if (!addonMessage) {
      logger.current.log({
        origin: EventOrigin.ADDON,
        type: EventType.INTERNAL,
        level: LogLevel.Trace,
        message: '[MXT][MessageReceiver]::handleReceivedMessage - ignoring event message as it is not addon message',
        context: [messageEvent.origin, JSON.stringify(messageEvent.data)],
      });
      return;
    }

    logger.current.log({
      origin: EventOrigin.HOST,
      type: EventType.MESSAGE,
      messageType: addonMessage.type,
      level: LogLevel.Info,
      message: `[MXT] Addon had received a ${addonMessage.type} message from host`,
      context: [JSON.stringify(addonMessage)],
    });

    switch (addonMessage.type) {
      case MessageType.HOST_EVENT_INIT: {
        const initMessage = addonMessage as HostEventInitMessage;
        const context = this.preprocessInitMessage(initMessage);
        this.onInit(context);
        break;
      }
      case MessageType.HOST_EVENT_DIAG:
        const context = this.handleLoadInfoMessage(addonMessage as HostEventDiagnosticMessage);
        this.onLoad(context);
        break;

      case MessageType.HOST_EVENT_STATE:
      case MessageType.HOST_REQUEST_TOOLTIPS:
        logger.current.log({
          origin: EventOrigin.ADDON,
          type: EventType.INTERNAL,
          message: `[MXT][MessageReceiver] :: onReceived - valid host event ${addonMessage.type} received and forwarded`,
          level: LogLevel.Info,
          context: [JSON.stringify(addonMessage)],
        });
        break;
      case MessageType.CLIENT_EVENT_READY:
      case MessageType.CLIENT_REQUEST_DECORATE:
      case MessageType.CLIENT_REQUEST_NOTIFY:
      case MessageType.CLIENT_REQUEST_ENVIRONMENT:
      case MessageType.CLIENT_REQUEST_NAVIGATE:
      case MessageType.CLIENT_REQUEST_SNAPSHOT:
        logger.current.log({
          origin: EventOrigin.ADDON,
          type: EventType.INTERNAL,
          message: `[MXT][MessageReceiver] :: onReceived - Client event ${addonMessage.type} received from host - ERROR`,
          level: LogLevel.Error,
          context: [JSON.stringify(addonMessage)],
        });
        break;
      default:
        logger.current.log({
          origin: EventOrigin.ADDON,
          type: EventType.INTERNAL,
          message: `[MXT][MessageReceiver] :: onReceived - Unknown event type: ${addonMessage.type}`,
          level: LogLevel.Error,
          context: [JSON.stringify(addonMessage)],
        });
    }
  };

  private getAddonMessage = (messageEvent: MessageEvent): Message | null => {
    if (!messageEvent) {
      return null;
    }

    const hostOrigin = validHostOrigin(messageEvent.origin);
    if (!hostOrigin) {
      logger.current.log({
        origin: EventOrigin.ADDON,
        type: EventType.INTERNAL,
        level: LogLevel.Trace,
        message: '[MXT][MessageReceiver]::getAddonMessage - invalid origin',
        context: [messageEvent.origin, `host:${hostOrigin}`],
      });
      return null;
    }

    if (!messageEvent.data || typeof messageEvent.data !== 'string') {
      logger.current.log({
        origin: EventOrigin.ADDON,
        type: EventType.INTERNAL,
        level: LogLevel.Trace,
        message: '[MXT][MessageReceiver]::getAddonMessage - message event data is not a string',
        context: [JSON.stringify(messageEvent.data)],
      });
      return null;
    }

    let hostMessage: Message;
    try {
      hostMessage = JSON.parse(messageEvent.data);
      if (!hostMessage || !hostMessage.type) {
        logger.current.log({
          origin: EventOrigin.ADDON,
          type: EventType.INTERNAL,
          level: LogLevel.Debug,
          message: '[MXT][MessageReceiver]::getAddonMessage - invalid message data format',
          context: [messageEvent.data],
        });

        return null;
      }
    } catch (e) {
      logger.current.log({
        origin: EventOrigin.ADDON,
        type: EventType.INTERNAL,
        level: LogLevel.Debug,
        message: '[MXT][MessageReceiver]::getAddonMessage - not a json data',
        context: [messageEvent.data, JSON.stringify(e)],
      });

      return null;
    }

    if (!runtime.origin) {
      const initializedOrigin = this.initializeOrigin(hostMessage, messageEvent);
      if (!initializedOrigin) {
        logger.current.log({
          origin: EventOrigin.ADDON,
          type: EventType.INTERNAL,
          level: LogLevel.Trace,
          message: '[MXT][MessageReceiver]::getAddonMessage - origin not initialized',
          context: [],
        });
        return null;
      }
    }

    return hostMessage;
  };

  private initializeOrigin = (hostMessage: Message, messageEvent: MessageEvent) => {
    if (hostMessage.type !== MessageType.HOST_EVENT_INIT) {
      return null;
    }

    if (!validHostOrigin(messageEvent.origin)) {
      return null;
    }

    logger.current.log({
      origin: EventOrigin.ADDON,
      type: EventType.INTERNAL,
      level: LogLevel.Debug,
      message: '[MXT][MessageReceiver]::getAddonMessage- setting origin',
      context: [messageEvent.origin],
    });

    runtime.origin = messageEvent.origin;
    return runtime.origin;
  };

  private preprocessInitMessage = (initMessage: HostEventInitMessage): InitializationContext => {
    runtime.manifest = initMessage.manifest;
    runtime.configuration = initMessage.configuration;
    runtime.locale = initMessage.locale ?? PredefinedLocale.UNDEFINED;
    runtime.sessionId = initMessage.sessionId;
    runtime.theme = initMessage.theme ?? PredefinedTheme.UNDEFINED;

    const initializationContext = new InitializationContext();
    initializationContext.configuration = initMessage.configuration;
    initializationContext.sessionId = initMessage.sessionId;
    initializationContext.state = initMessage.state ?? PredefinedMeetingState.UNDEFINED;
    initializationContext.participants = initMessage.participants ?? [];

    initializationContext.host = new HostContext();
    initializationContext.host.urlParams = initMessage.locationSearchParams;
    initializationContext.host.locale = runtime.locale;
    initializationContext.host.configuration = runtime.configuration;
    initializationContext.host.environment = initMessage.environment;
    initializationContext.host.version = initMessage.version;

    const userContext = new UserContext();
    const meetContext = new MeetContext();
    const sessionContext = new SessionContext();
    for (let i = 0; i < initMessage.context.length; i++) {
      const param = initMessage.context[i];

      let handled = userContext.initFrom(param);
      if (handled) {
        initializationContext.user = initializationContext.user || userContext;
      }

      handled = meetContext.initFrom(param);
      if (handled) {
        initializationContext.meet = initializationContext.meet || meetContext;
      }

      handled = sessionContext.initFrom(param);
      if (handled) {
        initializationContext.session = initializationContext.session || sessionContext;
      }
    }

    logger.current.log({
      origin: EventOrigin.ADDON,
      type: EventType.INTERNAL,
      message: '[MXT][MessageReceiver]::preprocessInitMessage',
      level: LogLevel.Debug,
      context: [
        `message: ${JSON.stringify(initMessage)}`,
        `context: ${JSON.stringify(initializationContext)}`,
        `origin: ${runtime.origin || 'N/A'}`,
      ],
    });

    return initializationContext;
  };

  private handleLoadInfoMessage = (message: HostEventDiagnosticMessage): DiagnosticContext => {
    let logLevel = LogLevel.Debug;
    if (message.loadTime > 2000) {
      logLevel = LogLevel.Error;
    } else if (message.loadTime > 1000) {
      logLevel = LogLevel.Warning;
    }

    logger.current.log({
      origin: EventOrigin.ADDON,
      type: EventType.MESSAGE,
      messageType: message.type,
      level: logLevel,
      message: `[MXT] Addon received message ${message.type} of type `,
      context: [JSON.stringify(message)],
    });

    const loadContext: DiagnosticContext = {
      loadTime: message.loadTime,
      readyTime: message.readyTime,
    };

    return loadContext;
  };
}
