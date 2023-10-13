import { PredefinedNotificationType } from '../enums/PredefinedNotificationType';
import { Message } from './Message';
import { MessageType } from './MessageType';

export class NotificationMessage extends Message {
  /**
   *Creates an instance of NotificationMessage.
   * @memberof InitMessage
   */
  constructor() {
    super(MessageType.REQUEST_NOTIFY);
  }

  /**
   * Text of the notification to be shown to Meet user
   *
   * @type {string}
   * @memberof NotificationMessage
   */
  public notificationText!: string;

  /**
   * Type of notification being shown to Meet user.
   *
   * @type {PredefinedNotificationType}
   * @memberof NotificationMessage
   */
  public notificationType!: PredefinedNotificationType;
}
