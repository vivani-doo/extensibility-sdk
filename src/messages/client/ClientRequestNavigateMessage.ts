import { PredefinedNavigationDestination } from '../../enums/PredefinedNavigationDestination';
import { Message } from '../Message';
import { MessageType } from '../MessageType';

/**
 * Message sent from the addon to host requesting that host
 * navigate away addon iframe to a different part of the Meet application
 *
 * @export
 * @class ClientRequestNavigateMessage
 * @extends {Message}
 */
export class ClientRequestNavigateMessage extends Message {
  /**
   *Creates an instance of InitMessage.
   * @memberof ClientRequestNavigateMessage
   */
  constructor() {
    super(MessageType.CLIENT_REQUEST_NAVIGATE);
  }

  /**
   * Host destination of the navigation request.
   *
   * @type {PredefinedNavigationDestination}
   * @memberof ClientRequestNavigateMessage
   */
  public destination!: PredefinedNavigationDestination;

  /**
   * Identity value (if any)
   *
   * @type {string}
   * @memberof ClientRequestNavigateMessage
   */
  public id?: string;

  /**
   * List of key value parameters to be sent to the navigation destination (if any)
   *
   * @type {{ [key: string]: string}}
   * @memberof ClientRequestNavigateMessage
   */
  public params?: { [key: string]: string };
}
