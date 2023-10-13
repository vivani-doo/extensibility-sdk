import { Message } from '../Message';
import { MessageType } from '../MessageType';

export class ClientRequestDecorateMessage extends Message {
  /**
   * Creates an instance of ClientRequestDecorateMessage.
   * @memberof ClientRequestDecorateMessage
   */
  constructor() {
    super(MessageType.CLIENT_REQUEST_DECORATE);
  }

  /**
   * Extension decoration to be shown to Meet user
   * in a form of badge or text decoration
   *
   * @type {string}
   * @memberof ClientRequestDecorateMessage
   */
  public value!: string;
}
