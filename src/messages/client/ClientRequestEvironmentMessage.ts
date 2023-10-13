import { PredefinedAddonHostMode } from '../../enums/PredefinedAddonHostMode';
import { PredefinedChromeState } from '../../enums/PredefinedChromeState';
import { Message } from '../Message';
import { MessageType } from '../MessageType';

/**
 * Message sent from client to host signalizing that the client is ready for initialization
 *
 * @export
 * @class ClientEventReadyMessage
 * @extends {Message}
 */
export class ClientRequestEvironmentMessage extends Message {
  /**
   *Creates an instance of ClientRequestEvironmentMessage.
   * @memberof ClientRequestEvironmentMessage
   */
  constructor() {
    super(MessageType.CLIENT_REQUEST_ENVIRONMENT);
  }

  /**
   * Host chrome state
   *
   * @type {PredefinedChromeState}
   * @memberof HostEventStateMessage
   */
  chrome?: PredefinedChromeState;

  /**
   * State in which the addon should be rendered
   *
   * @type {PredefinedAddonInactiveMode}
   * @memberof HostEventStateMessage
   */
  mode?: PredefinedAddonHostMode;

  /**
   * Identifier of the panel addon to be activated
   *
   * @type {string}
   * @memberof ClientRequestEvironmentMessage
   */
  panel?: string;
}
