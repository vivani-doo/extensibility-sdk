import { AppContext } from '../context/AppContext';
import runtime from '../context/RuntimeContext';
import { PredefinedNavigationDestination } from '../enums/PredefinedNavigationDestination';
import { PredefinedNotificationType } from '../enums/PredefinedNotificationType';
import { EventOrigin } from '../logging/EventOrigin';
import { EventType } from '../logging/EventType';
import logger from '../logging/Logger';
import { LogLevel } from '../logging/LogLevel';
import { DecorationMessage } from '../messages/DecorationMessage';
import { Message } from '../messages/Message';
import { MessageType } from '../messages/MessageType';
import { NavigationMessage } from '../messages/NavigationMessage';
import { NotificationMessage } from '../messages/NotificationMessage';

export class MessageSender {
  /**
   *
   */
  constructor(private initTask?: Task<AppContext>) {}

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
