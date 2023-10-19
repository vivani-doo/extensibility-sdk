import { Message } from '../Message';
import { MessageType } from '../MessageType';

/**
 * Message sent from host to client requesting a host to
 * activate the addon in shell
 *
 * @export
 * @class HostRequestShellMessage
 * @extends {Message}
 */
export class HostRequestShellMessage extends Message {
  /**
   *Creates an instance of HostRequestShellMessage.
   * @memberof HostRequestShellMessage
   */
  constructor() {
    super(MessageType.HOST_REQUEST_SHELL);
  }

  /**
   * Forcing showing of the tooltip regardless of the host context.
   *
   * @type {boolean}
   * @memberof HostRequestTooltipsMessage
   */
  public forced?: boolean;
}
