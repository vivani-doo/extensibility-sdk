import { AppContext } from './context/AppContext';
import { LoadingContext } from './context/LoadingContext';
import runtime, { RuntimeContext } from './context/RuntimeContext';
import { PredefinedNavigationDestination } from './enums/PredefinedNavigationDestination';
import { PredefinedNotificationType } from './enums/PredefinedNotificationType';
import { EventOrigin } from './logging/EventOrigin';
import { EventType } from './logging/EventType';
import { ILogger } from './logging/ILogger';
import logger from './logging/Logger';
import { LogLevel } from './logging/LogLevel';
import { DecorationMessage } from './messages/DecorationMessage';
import { Message } from './messages/Message';
import { MessageType } from './messages/MessageType';
import { NavigationMessage } from './messages/NavigationMessage';
import { NotificationMessage } from './messages/NotificationMessage';
import { ReadyMessage } from './messages/ReadyMessage';
import { handleReceivedMessage } from './sdk/MessageReceiver';

export { ConfigurationItem } from './configuration/ConfigurationItem';
export { ConfigurationItemOption } from './configuration/ConfigurationItemOption';
export { ConfigurationValue } from './configuration/ConfigurationValue';

export { AllContextKeys } from './context/keys/AllContextKeys';
export { ClientContextKeys } from './context/keys/ClientContextKeys';
export { MeetContextKeys } from './context/keys/MeetContextKeys';
export { UserContextKeys } from './context/keys/UserContextKeys';

export { AppContext } from './context/AppContext';
export { ContextParam } from './context/ContextParam';
export { HostContext } from './context/HostContext';
export { LoadingContext } from './context/LoadingContext';
export { MeetContext } from './context/MeetContext';
export { RuntimeContext } from './context/RuntimeContext';
export { SessionContext } from './context/SessionContext';
export { UrlParam } from './context/UrlParam';
export { UserContext } from './context/UserContext';

export { PredefinedAddonActivateMode } from './enums/PredefinedAddonActivateMode';
export { PredefinedAddonCategory } from './enums/PredefinedAddonCategory';
export { PredefinedAddonInactiveMode } from './enums/PredefinedAddonInactiveMode';
export { PredefinedChromeState } from './enums/PredefinedChromeState';
export { PredefinedConfigurationItemType } from './enums/PredefinedConfigurationItemType';
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

export { DecorationMessage } from './messages/DecorationMessage';
export { InitMessage } from './messages/InitMessage';
export { LoadInfoMessage } from './messages/LoadInfoMessage';
export { Message } from './messages/Message';
export { MessageType } from './messages/MessageType';
export { NavigationMessage } from './messages/NavigationMessage';
export { NotificationMessage } from './messages/NotificationMessage';
export { ReadyMessage } from './messages/ReadyMessage';

class Task<T> {
  public promise!: Promise<T>;
  public onfulfilled!: (value: T) => void;
  public onrejected?: (reason: any) => void;
}

export class ExtensibilitySdk {
  private activeListener: boolean = false;
  private initTimer?: number;
  private initTask?: Task<AppContext>;

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
  public onLoad!: (context: LoadingContext) => void;

  public onMessage!: (message: Message) => void;

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

    // Default implementation of a handler showing a toast if loading times are longer then 2 seconds
    this.onLoad = (ctx: LoadingContext) => {
      logger.current.log({
        origin: EventOrigin.HOST,
        type: EventType.MESSAGE,
        messageType: MessageType.READY,
        level: LogLevel.Info,
        message: `[MXT] Addon loading context:${ctx}`,
        context: [JSON.stringify(ctx)],
      });
    };
  }

  public init = () => {
    if (this.initTask) {
      return this.initTask.promise;
    }

    this.initTask = new Task<AppContext>();
    this.initTask.promise = new Promise<AppContext>((resolve, reject) => {
      this.initTask!.onfulfilled = resolve;
      this.initTask!.onrejected = reject;

      if (!this.activeListener) {
        this.activeListener = true;
        window.addEventListener('message', (e) => handleReceivedMessage(e, this.resolveInitPromise, this.onLoad));
      }

      const message = new ReadyMessage();
      const postMessage = JSON.stringify(message);

      logger.current.log({
        origin: EventOrigin.ADDON,
        type: EventType.MESSAGE,
        messageType: MessageType.READY,
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
    await this.verifySdkInitialized();

    const message = new NotificationMessage();
    message.notificationText = text;
    message.notificationType = type;
    this.sendMessage(message, true);

    logger.current.log({
      origin: EventOrigin.ADDON,
      type: EventType.MESSAGE,
      messageType: message.type,
      level: LogLevel.Info,
      message: `[MXT] Addon is sending ${message.type} message to host`,
      context: [`Notification text: ${text}`, `Notification type: ${type}`],
    });
  };

  /**
   * Sends request to Meet hosting app to notify Meet user
   * about a certain even happening in addon.
   *
   * @param {string} value The new decoration value being requested to be shown by the host
   * @memberof ExtensibilitySdk
   */
  public decorate = async (value: string) => {
    await this.verifySdkInitialized();

    const message = new DecorationMessage();
    message.value = value;

    this.sendMessage(message, true);

    logger.current.log({
      origin: EventOrigin.ADDON,
      type: EventType.MESSAGE,
      messageType: message.type,
      level: LogLevel.Info,
      message: `[MXT] Addon is sending ${message.type} message to host`,
      context: [`Decoration text: ${value}`],
    });
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
    await this.verifySdkInitialized();

    const message = new NavigationMessage();
    message.destination = destination;
    message.id = id;
    message.params = params;
    this.sendMessage(message, true);

    logger.current.log({
      origin: EventOrigin.ADDON,
      type: EventType.MESSAGE,
      messageType: message.type,
      level: LogLevel.Info,
      message: `[MXT] Addon is sending ${message.type} message to host`,
      context: [],
    });
  };

  private sendMessage<T extends Message>(message: T, logged?: boolean) {
    this.verifySdkInitialized();

    if (!runtime.origin) {
      console.error('You can not send messages before SDK is initialized', message);
      return;
    }
    const postMessage = JSON.stringify(message);

    if (!logged) {
      logger.current.log({
        origin: EventOrigin.ADDON,
        type: EventType.MESSAGE,
        messageType: message.type,
        level: LogLevel.Info,
        message: `[MXT] Addon is sending ${message.type} message to host`,
        context: [postMessage, runtime.origin],
      });
    }

    window.parent.postMessage(postMessage, runtime.origin);
  }

  private resolveInitPromise = (cxt: AppContext) => {
    window.clearTimeout(this.initTimer);
    if (this.initTask) {
      this.initTask.onfulfilled(JSON.parse(JSON.stringify(cxt)));
    }
  };

  private verifySdkInitialized = async () => {
    // check if sdk.init() was called
    if (!this.initTask && runtime.origin) {
      const error = '[MXT] Please initialize SDK by calling sdk.init() before performing any additional calls';
      logger.current.log({
        origin: EventOrigin.ADDON,
        type: EventType.INTERNAL,
        messageType: MessageType.INIT,
        level: LogLevel.Error,
        message: error,
        context: [runtime.origin],
      });

      // throw an error - case is THAT important
      throw new Error(error);
    }

    // check if sdk.init() was resolved
    await this.initTask;
  };
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
