import { AppContext } from '../context/AppContext';
import { HostContext } from '../context/HostContext';
import { LoadingContext } from '../context/LoadingContext';
import { MeetContext } from '../context/MeetContext';
import runtime from '../context/RuntimeContext';
import { SessionContext } from '../context/SessionContext';
import { UserContext } from '../context/UserContext';
import { EventOrigin } from '../logging/EventOrigin';
import { EventType } from '../logging/EventType';
import logger from '../logging/Logger';
import { LogLevel } from '../logging/LogLevel';
import { InitMessage } from '../messages/InitMessage';
import { LoadInfoMessage } from '../messages/LoadInfoMessage';
import { Message } from '../messages/Message';
import { MessageType } from '../messages/MessageType';
import { validHostOrigin } from './utils';

export class MessageReceiver {
  /**
   * Creates an instance of MessageReceiver.
   * @param {(cxt: AppContext) => void} onInit
   * @param {(context: LoadingContext) => void} onLoad
   * @memberof MessageReceiver
   */
  constructor(
    private onInit: (cxt: AppContext) => void,
    private onLoad: (context: LoadingContext) => void,
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
      case MessageType.INIT: {
        const initMessage = addonMessage as InitMessage;
        const context = this.preprocessInitMessage(initMessage);
        this.onInit(context);
        break;
      }
      case MessageType.HOST_LOAD_INFO:
        const context = this.handleLoadInfoMessage(addonMessage as LoadInfoMessage);
        this.onLoad(context);
        break;
      case MessageType.READY:
      case MessageType.REQUEST_DECORATION_UPDATE:
      case MessageType.REQUEST_NOTIFY:
        logger.current.log({
          origin: EventOrigin.ADDON,
          type: EventType.INTERNAL,
          message: `[MXT][MessageReceiver] :: onReceived - Client event ${addonMessage.type} received from host (ERROR)`,
          level: LogLevel.Error,
          context: [JSON.stringify(addonMessage)],
        });
        break;
      default:
        logger.current.log({
          origin: EventOrigin.ADDON,
          type: EventType.INTERNAL,
          message: `[MXT][MessageReceiver] :: onReceived - Unknown event type: ${addonMessage.type}`,
          level: LogLevel.Warning,
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
    if (hostMessage.type !== MessageType.INIT) {
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

  private preprocessInitMessage = (initMessage: InitMessage): AppContext => {
    runtime.manifest = initMessage.manifest;
    runtime.configuration = initMessage.configuration;
    runtime.locale = initMessage.locale;
    runtime.sessionId = initMessage.sessionId;
    runtime.theme = initMessage.theme;

    const appContext = new AppContext();
    appContext.host = new HostContext();
    appContext.host.urlParams = initMessage.locationSearchParams;
    appContext.host.locale = runtime.locale;
    appContext.host.configuration = runtime.configuration;

    const userContext = new UserContext();
    const meetContext = new MeetContext();
    const sessionContext = new SessionContext();
    for (let i = 0; i < initMessage.context.length; i++) {
      const param = initMessage.context[i];

      let handled = userContext.initFrom(param);
      if (handled) {
        appContext.user = appContext.user || userContext;
      }

      handled = meetContext.initFrom(param);
      if (handled) {
        appContext.meet = appContext.meet || meetContext;
      }

      handled = sessionContext.initFrom(param);
      if (handled) {
        appContext.session = appContext.session || sessionContext;
      }
    }

    logger.current.log({
      origin: EventOrigin.ADDON,
      type: EventType.INTERNAL,
      message: '[MXT][MessageReceiver]::preprocessInitMessage',
      level: LogLevel.Debug,
      context: [
        `message: ${JSON.stringify(initMessage)}`,
        `context: ${JSON.stringify(appContext)}`,
        `origin: ${runtime.origin || 'N/A'}`,
      ],
    });

    return appContext;
  };

  private handleLoadInfoMessage = (message: LoadInfoMessage): LoadingContext => {
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

    const loadContext: LoadingContext = {
      loadTime: message.loadTime,
      readyTime: message.readyTime,
    };

    return loadContext;
  };
}
