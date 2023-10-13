import { InitializationContext } from '../context/InitializationContext';
import runtime from '../context/RuntimeContext';
import { PredefinedAddonHostMode } from '../enums/PredefinedAddonHostMode';
import { PredefinedChromeState } from '../enums/PredefinedChromeState';
import { PredefinedNavigationDestination } from '../enums/PredefinedNavigationDestination';
import { PredefinedNotificationType } from '../enums/PredefinedNotificationType';
import { EventOrigin } from '../logging/EventOrigin';
import { EventType } from '../logging/EventType';
import logger from '../logging/Logger';
import { LogLevel } from '../logging/LogLevel';
import { ClientRequestDecorateMessage } from '../messages/client/ClientRequestDecorateMessage';
import { ClientRequestEvironmentMessage } from '../messages/client/ClientRequestEvironmentMessage';
import { ClientRequestNavigateMessage } from '../messages/client/ClientRequestNavigateMessage';
import { ClientRequestNotifyMessage } from '../messages/client/ClientRequestNotifyMessage';
import { ClientRequestSnapshotMessage } from '../messages/client/ClientRequestSnapshotMessage';
import { Message } from '../messages/Message';
import { MessageType } from '../messages/MessageType';

export class MessageSender {
  /**
   * Creates an instance of MessageSender.
   * @param {Task<InitializationContext>} [initTask]
   * @memberof MessageSender
   */
  constructor(private initTask?: Task<InitializationContext>) {}

  /**
   * Sends request to Meet hosting app to update environment
   *
   * @memberof MessageSender
   */
  public environment = async (chrome?: PredefinedChromeState, mode?: PredefinedAddonHostMode, panel?: string) => {
    await this.verifySdkInitialized();

    const message = new ClientRequestEvironmentMessage();
    message.chrome = chrome;
    message.mode = mode;
    message.panel == panel;
    this.sendMessage(message, true);

    logger.current.log({
      origin: EventOrigin.ADDON,
      type: EventType.MESSAGE,
      messageType: message.type,
      level: LogLevel.Info,
      message: `[MXT] Addon is sending ${message.type} message to host`,
      context: [`Environment update - chrome: ${chrome}`, `mode: ${mode}`, `panel:${panel}`],
    });
  };

  /**
   * Sends request to Meet hosting app to take a snapshot
   *
   * @memberof MessageSender
   */
  public snapshot = async () => {
    await this.verifySdkInitialized();

    const message = new ClientRequestSnapshotMessage();
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
  /**
   * Sends request to Meet hosting app to notify Meet user
   * about a certain even happening in addon.
   *
   * @memberof MessageSender
   */
  public notify = async (text: string, type: PredefinedNotificationType) => {
    await this.verifySdkInitialized();

    const message = new ClientRequestNotifyMessage();
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
   * @memberof MessageSender
   */
  public decorate = async (value: string) => {
    await this.verifySdkInitialized();

    const message = new ClientRequestDecorateMessage();
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
   * @param {PredefinedNavigationDestination} destination Host destination of the navigation request.
   * @param {string} [id] Entity or addon identity to which navigation should go.
   * @param {{ [key: string]: string}} [params] List of key value parameters to be sent to the navigation destination (if any)
   * @param {NavigationTarget} [target]
   * @memberof MessageSender
   */
  public navigate = async (
    destination: PredefinedNavigationDestination,
    id?: string,
    params?: { [key: string]: string },
  ) => {
    await this.verifySdkInitialized();

    const message = new ClientRequestNavigateMessage();
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

  private verifySdkInitialized = async () => {
    // check if sdk.init() was called
    if (!this.initTask && runtime.origin) {
      const error = '[MXT] Please initialize SDK by calling sdk.init() before performing any additional calls';
      logger.current.log({
        origin: EventOrigin.ADDON,
        type: EventType.INTERNAL,
        messageType: MessageType.HOST_EVENT_INIT,
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
