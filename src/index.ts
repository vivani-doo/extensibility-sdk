import { DiagnosticContext } from './context/DiagnosticContext';
import { InitializationContext } from './context/InitializationContext';
import runtime, { RuntimeContext } from './context/RuntimeContext';
import { PredefinedAddonHostMode } from './enums/PredefinedAddonHostMode';
import { PredefinedChromeState } from './enums/PredefinedChromeState';
import { PredefinedNavigationDestination } from './enums/PredefinedNavigationDestination';
import { PredefinedNotificationType } from './enums/PredefinedNotificationType';
import { EventOrigin } from './logging/EventOrigin';
import { EventType } from './logging/EventType';
import { ILogger } from './logging/ILogger';
import logger from './logging/Logger';
import { LogLevel } from './logging/LogLevel';
import { ClientEventReadyMessage } from './messages/client/ClientEventReadyMessage';
import { Message } from './messages/Message';
import { MessageType } from './messages/MessageType';
import { MessageReceiver } from './sdk/MessageReceiver';
import { MessageSender } from './sdk/MessageSender';
import { Task } from './sdk/Task';

export { ConfigurationItem } from './configuration/ConfigurationItem';
export { ConfigurationItemOption } from './configuration/ConfigurationItemOption';
export { ConfigurationValue } from './configuration/ConfigurationValue';

export { AllContextKeys } from './context/keys/AllContextKeys';
export { ClientContextKeys } from './context/keys/ClientContextKeys';
export { MeetContextKeys } from './context/keys/MeetContextKeys';
export { UserContextKeys } from './context/keys/UserContextKeys';

export { InitializationContext as AppContext } from './context/InitializationContext';
export { ContextParam } from './context/ContextParam';
export { HostContext } from './context/HostContext';
export { MeetContext } from './context/MeetContext';
export { RuntimeContext } from './context/RuntimeContext';
export { SessionContext } from './context/SessionContext';
export { UrlParam } from './context/UrlParam';
export { ParticipantInfo } from './context/ParticipantInfo';
export { UserContext } from './context/UserContext';
export { TokenInfo } from './context/TokenInfo';

export { PredefinedAddonActivateMode } from './enums/PredefinedAddonActivateMode';
export { PredefinedAddonCategory } from './enums/PredefinedAddonCategory';
export { PredefinedAddonHostMode } from './enums/PredefinedAddonHostMode';
export { PredefinedAddonInactiveMode } from './enums/PredefinedAddonInactiveMode';
export { PredefinedChromeState } from './enums/PredefinedChromeState';
export { PredefinedConfigurationItemType } from './enums/PredefinedConfigurationItemType';
export { PredefinedEnvironment } from './enums/PredefinedEnvironment';
export { PredefinedHostType } from './enums/PredefinedHostType';
export { PredefinedLocale } from './enums/PredefinedLocale';
export { PredefinedMeetingState } from './enums/PredefinedMeetingState';
export { PredefinedNavigationDestination } from './enums/PredefinedNavigationDestination';
export { PredefinedNotificationType } from './enums/PredefinedNotificationType';
export { PredefinedRole } from './enums/PredefinedRole';
export { PredefinedTheme } from './enums/PredefinedTheme';

export { ILogger } from './logging/ILogger';
export { LogLevel } from './logging/LogLevel';
export { Event } from './logging/Event';
export { EventOrigin } from './logging/EventOrigin';
export { EventType } from './logging/EventType';

export { LocalizedString } from './i18n/LocalizedString';

export { Manifest } from './manifest/Manifest';
export { ManifestAuthor } from './manifest/ManifestAuthor';
export { ManifestConfigurationItem } from './manifest/ManifestConfigurationItem';
export { ManifestHost } from './manifest/ManifestHost';
export { ManifestRuntime } from './manifest/ManifestRuntime';
export { ManifestStore } from './manifest/ManifestStore';

export { ClientEventReadyMessage } from './messages/client/ClientEventReadyMessage';
export { ClientRequestDecorateMessage } from './messages/client/ClientRequestDecorateMessage';
export { ClientRequestEvironmentMessage } from './messages/client/ClientRequestEvironmentMessage';
export { ClientRequestNavigateMessage } from './messages/client/ClientRequestNavigateMessage';
export { ClientRequestNotifyMessage } from './messages/client/ClientRequestNotifyMessage';
export { ClientRequestSnapshotMessage } from './messages/client/ClientRequestSnapshotMessage';

export { HostEventDiagnosticMessage } from './messages/host/HostEventDiagnosticMessage';
export { HostEventInitMessage } from './messages/host/HostEventInitMessage';
export { HostEventStateMessage } from './messages/host/HostEventStateMessage';
export { HostRequestTooltipsMessage } from './messages/host/HostRequestTooltipsMessage';
export { HostRequestShellMessage } from './messages/host/HostRequestShellMessage';

export { Message } from './messages/Message';
export { MessageType } from './messages/MessageType';

export { Task } from './sdk/Task';

export {
  isClientDecorateMessage,
  isClientEnvironmentMessage,
  isClientNavigationMessage,
  isClientNotificationMessage,
  isClientReadyMessage,
  isClientSnapshotMessage,
  isHostDiagnosticsMessage,
  isHostInitMessage,
  isHostShellMessage,
  isHostStateMessage,
  isHostTooltipMessage,
} from './sdk/messageGuards';

export class ExtensibilitySdk {
  private activeListener: boolean = false;
  private initTimer?: number;
  private initTask?: Task<InitializationContext>;

  public getRuntime = (): RuntimeContext => runtime;

  /**
   * Load handler is being invoked after the addon is fully loaded,
   * and it provides to addon creator performance information on addon loading.
   * Default implementation would show a toast if addon loading times were longer than 2 seconds.
   * Addon creator can implement its load handler and handle the received performance data
   * differently (report it to its telemetry service, show a custom addon UI, etc.)
   *
   * @memberof ExtensibilitySdk
   */
  public onLoad!: (context: DiagnosticContext) => void;

  public onMessage!: (message: Message) => void;

  private resolveInitPromise = (cxt: InitializationContext) => {
    window.clearTimeout(this.initTimer);
    if (this.initTask) {
      this.initTask.onfulfilled(JSON.parse(JSON.stringify(cxt)));
    }
  };

  /**
   * Changes the implementation of the logger used by SDK for
   * publishing diagnostic info and events
   *
   * @param {ILogger} newLogger
   * @memberof ExtensibilitySdk
   */
  public setLogger = (newLogger: ILogger) => {
    logger.current = newLogger;
  };

  /**
   * Gets the minimal log level used for
   * deciding which one of the logs should be ignored
   * and which one processed.
   *
   * @type {LogLevel}
   * @memberof ExtensibilitySdk
   */
  public get logLevel(): LogLevel {
    return logger.current.level;
  }

  /**
   * Sets the minimal log level used for
   * deciding which one of the logs should be ignored
   * and which one processed.
   *
   * @type {LogLevel}
   * @memberof ExtensibilitySdk
   */
  public set logLevel(v: LogLevel) {
    logger.current.level = v;
  }

  /**
   * Creates an instance of ExtensibilitySdk.
   * @memberof ExtensibilitySdk
   */
  constructor() {
    this.onMessage = (message: Message) => {
      logger.current.log({
        origin: EventOrigin.HOST,
        type: EventType.MESSAGE,
        messageType: message.type,
        level: LogLevel.Info,
        message: `[MXT] Addon received message:${message.type}  from host`,
        context: [JSON.stringify(message)],
      });
    };
  }

  public init = () => {
    if (this.initTask) {
      return this.initTask.promise;
    }

    this.initTask = new Task<InitializationContext>();
    this.initTask.promise = new Promise<InitializationContext>((resolve, reject) => {
      this.initTask!.onfulfilled = resolve;
      this.initTask!.onrejected = reject;

      if (!this.activeListener) {
        this.activeListener = true;
        window.addEventListener('message', (e) => {
          logger.current.log({
            origin: EventOrigin.HOST,
            type: EventType.MESSAGE,
            messageType: MessageType.HOST_EVENT_INIT,
            level: LogLevel.Info,
            message: `[MXT] Addon received a message from host`,
            context: [e.data],
          });
          this.messageReceiver.handleReceivedMessage(e);
        });
      }

      const message = new ClientEventReadyMessage();
      const postMessage = JSON.stringify(message);

      logger.current.log({
        origin: EventOrigin.ADDON,
        type: EventType.MESSAGE,
        messageType: MessageType.CLIENT_EVENT_READY,
        level: LogLevel.Info,
        message: `[MXT] Addon is sending ${message.type} message to host`,
        context: [],
      });

      window.parent?.postMessage(postMessage, '*');

      this.initTimer = window.setTimeout(() => {
        const error = '[MXT] Addon initialization failed - timeout error';
        console.error(error);
        reject(error);
      }, 10 * 1000);
    });

    return this.initTask.promise;
  };

  /**
   * Sends request to Meet hosting app to notify Meet user
   * about a certain even happening in addon.
   *
   * @memberof ExtensibilitySdk
   */
  public notify = async (text: string, type: PredefinedNotificationType) => {
    this.messageSender.notify(text, type);
  };

  /**
   * Sends request to Meet hosting app to notify Meet user
   * about a certain even happening in addon.
   *
   * @param {string} value The new decoration value being requested to be shown by the host
   * @memberof ExtensibilitySdk
   */
  public decorate = async (value: string) => {
    this.messageSender.decorate(value);
  };

  /**
   * Request from the host to navigate to a different part of the Meet application.
   *
   * @param {NavigationDestination} destination Host destination of the navigation request.
   * @param {string} [id] Entity or addon identity to which navigation should go.
   * @param {{ [key: string]: string}} [params] List of key value parameters to be sent to the navigation destination (if any)
   * @param {NavigationTarget} [target]
   */
  public navigate = async (
    destination: PredefinedNavigationDestination,
    id?: string,
    params?: { [key: string]: string },
  ) => {
    this.messageSender.navigate(destination, id, params);
  };

  /**
   * Sends request to Meet hosting app to update environment
   *
   * @memberof MessageSender
   */
  public environment = async (chrome?: PredefinedChromeState, mode?: PredefinedAddonHostMode, panel?: string) => {
    this.messageSender.environment(chrome, mode, panel);
  };

  /**
   * Sends request to Meet hosting app to take a snapshot
   *
   * @memberof MessageSender
   */
  public snapshot = async () => {
    this.messageSender.snapshot();
  };

  /**
   * Sends request to Meet hosting app to take a snapshot
   *
   * @memberof MessageSender
   */
  public requestShell = async (forced?: boolean) => {
    this.messageSender.requestShell(forced);
  };

  /**
   * Sends request to Meet hosting app to show tooltips
   *
   * @memberof MessageSender
   */
  public requestTooltips = async (forced?: boolean) => {
    this.messageSender.requestTooltips(forced);
  };

  /**
   * Sends a message to  Meet hosting app to take a snapshot
   *
   * @memberof MessageSender
   */
  public sendMessage<T extends Message>(message: T, logged?: boolean) {
    this.messageSender.sendMessage(message, logged);
  }

  private messageSender = new MessageSender(this.initTask);
  private messageReceiver = new MessageReceiver(this.resolveInitPromise, this.onLoad);
}

declare global {
  interface Window {
    vivani: {
      logLevel?: LogLevel;
      extensibilitySdk?: ExtensibilitySdk;
    };
  }
}

// exposing sdk as  a global variable
window.vivani = window.vivani || {};
window.vivani.extensibilitySdk = new ExtensibilitySdk();

export default window.vivani.extensibilitySdk;
