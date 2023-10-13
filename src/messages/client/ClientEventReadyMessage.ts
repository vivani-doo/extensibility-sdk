import { Message } from '../Message';
import { MessageType } from '../MessageType';

/**
 * Message sent from client to host signalizing that the client is ready for initialization
 *
 * @export
 * @class ClientEventReadyMessage
 * @extends {Message}
 */
export class ClientEventReadyMessage extends Message {
  /**
   *Creates an instance of ClientEventReadyMessage.
   * @memberof ClientEventReadyMessage
   */
  constructor() {
    super(MessageType.CLIENT_EVENT_READY);
  }
}
