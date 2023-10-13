import { Message } from '../Message';
import { MessageType } from '../MessageType';

/**
 * Event sent from host to addons requesting them to
 * load a previously saved snapshot for a given
 * snapshot id.
 *
 * @export
 * @class ClientRequestSnapshotMessage
 * @extends {Message}
 */
export class ClientRequestSnapshotMessage extends Message {
  /**
   * Creates an instance of ClientRequestSnapshotMessage.
   * @memberof ClientRequestSnapshotMessage
   */
  constructor() {
    super(MessageType.CLIENT_REQUEST_SNAPSHOT);
  }
}
