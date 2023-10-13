import { ParticipantInfo } from '../../context/ParticipantInfo';
import { PredefinedAddonHostMode } from '../../enums/PredefinedAddonHostMode';
import { PredefinedChromeState } from '../../enums/PredefinedChromeState';
import { PredefinedLocale } from '../../enums/PredefinedLocale';
import { PredefinedMeetingState } from '../../enums/PredefinedMeetingState';
import { PredefinedTheme } from '../../enums/PredefinedTheme';
import { Message } from '../Message';
import { MessageType } from '../MessageType';

/**
 * Event message of this type os sent when host change the context in which addon
 * exists (theme change, fullscreen state, active addon, meeting state changed etc)
 *
 * @export
 * @class HostEventStateMessage
 * @extends {Message}
 */
export class HostEventStateMessage extends Message {
  /**
   *Creates an instance of InitMessage.
   * @memberof HostEventStateMessage
   */
  constructor(type?: MessageType) {
    super(type ?? MessageType.HOST_EVENT_INIT);
  }

  /**
   * Identifier of the active canvas addon
   *
   * @type {string}
   * @memberof HostEventStateMessage
   */
  canvas?: string;

  /**
   * Language locale to be used in rendering addon.
   *
   * @type {Locale}
   * @memberof HostEventStateMessage
   */
  locale?: PredefinedLocale;

  /**
   * A theme addon should be using in rendering.
   *
   * @type {PredefinedTheme}
   * @memberof HostEventStateMessage
   */
  theme?: PredefinedTheme;

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
   * @type {PredefinedAddonHostMode}
   * @memberof HostEventStateMessage
   */
  mode?: PredefinedAddonHostMode;

  /**
   * Current Meet state
   *
   * @type {PredefinedMeetingState}
   * @memberof HostEventStateMessage
   */
  state?: PredefinedMeetingState;

  /**
   * Collection of Meet participants in the moment when addon is initialized
   *
   * @type {ParticipantInfo[]}
   * @memberof InitializationContext
   */
  participants?: ParticipantInfo[];
}
