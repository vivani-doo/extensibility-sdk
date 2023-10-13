import { Message } from '../Message';
import { MessageType } from '../MessageType';
import { ParticipantInfo } from './ParticipantInfo';

/**
 *  * It contains performance measurements on addon loading which addon creators
 * can utilize to improve addon performance, inform users if there are issues and
 * report back to their own telemetry infrastructure.
 *
 *
 * @export
 * @class HostInitEventDiagnostic
 * @extends {Message}
 */
export class HostEventParticipantsMessage extends Message {
  /**
   *Creates an instance of InitMessage.
   * @memberof HostEventParticipantsMessage
   */
  constructor() {
    super(MessageType.HOST_EVENT_PARTICIPANTS);
  }

  /**
   * A list of Meet participants
   *
   * @type {ParticipantInfo}
   * @memberof HostEventParticipantsMessage
   */
  public participants: ParticipantInfo[] = [];
}
