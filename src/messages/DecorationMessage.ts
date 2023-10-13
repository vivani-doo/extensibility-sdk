import { Message } from './Message';
import { MessageType } from './MessageType';

export class DecorationMessage extends Message {
  /**
   * Creates an instance of DecorationMessage.
   * @memberof DecorationMessage
   */
  constructor() {
    super(MessageType.REQUEST_DECORATION_UPDATE);
  }

  /**
   * Extension decoration to be shown to Meet user
   * in a form of badge or text decoration
   *
   * @type {string}
   * @memberof DecorationUpdateMessage
   */
  public value!: string;
}
