import { Message } from '../Message';
import { MessageType } from '../MessageType';

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
export class HostEventDiagnosticMessage extends Message {
  /**
   *Creates an instance of InitMessage.
   * @memberof HostEventDiagnosticMessage
   */
  constructor() {
    super(MessageType.HOST_EVENT_DIAG);
  }

  /**
   * Duration how long it took for addon to be loaded.
   * Measured as time between addon start (iframe element creation) to iframe onloaded event.
   *
   * @type {number}
   * @memberof HostEventDiagnosticMessage
   */
  public loadTime!: number;

  /**
   * Duration how long it took from start(iframe element creation) to host receiving Ready message.
   *
   * @type {number}
   * @memberof HostEventDiagnosticMessage
   */
  public readyTime!: number;
}
