import { PredefinedNotificationType } from '../../enums/PredefinedNotificationType';
import { Message } from '../Message';
import { MessageType } from '../MessageType';

/**
 * Message sent from client to host requesting host to notify user about a message client has.
 * (e.g. requesting from host to show a toast informing user that addon had an error)
 *
 * @export
 * @class ClientRequestNotifyMessage
 * @extends {Message}
 */
export class ClientRequestNotifyMessage extends Message {
  /**
   *Creates an instance of ClientRequestNotifyMessage.
   * @memberof InitMessage
   */
  constructor() {
    super(MessageType.CLIENT_REQUEST_NOTIFY);
  }

  /**
   * Text of the notification to be shown to Meet user
   *
   * @type {string}
   * @memberof ClientRequestNotifyMessage
   */
  public notificationText!: string;

  /**
   * Type of notification being shown to Meet user.
   *
   * @type {PredefinedNotificationType}
   * @memberof ClientRequestNotifyMessage
   */
  public notificationType!: PredefinedNotificationType;
}
