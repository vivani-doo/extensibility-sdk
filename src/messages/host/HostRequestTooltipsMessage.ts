import { Message } from '../Message';
import { MessageType } from '../MessageType';

/**
 * Message sent from host to client containing in its payload the context information
 * client needs to initialize addon experience.
 *
 * @export
 * @class HostInitEventMessage
 * @extends {Message}
 */
export class HostRequestTooltipsMessage extends Message {
  /**
   *Creates an instance of InitMessage.
   * @memberof HostRequestTooltipsMessage
   */
  constructor() {
    super(MessageType.HOST_REQUEST_TOOLTIPS);
  }

  /**
   * Forcing showing of the tooltip regardless of the host context.
   *
   * @type {boolean}
   * @memberof HostRequestTooltipsMessage
   */
  public forced?: boolean;
}
