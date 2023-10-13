import { PredefinedRole } from '../enums/PredefinedRole';

export class ParticipantInfo {
  /**
   * Addon specific meeting participant identifier hash
   *
   * @type {string}
   * @memberof ParticipantInfo
   */
  public addonUserId!: string;

  /**
   * Url of the participant avatar (if any).
   * Avatar can be undefined if user has no avatar or
   * choose in user privacy settings not to share it with addons.
   *
   * @type {string}
   * @memberof ParticipantInfo
   */
  public avatarUrl?: string;

  /**
   * Display name of the participant (if any).
   *
   * Display name can be undefined if user choose in
   * user privacy settings to not share it with addons.
   * @type {string}
   * @memberof ParticipantInfo
   */
  public displayName?: string;

  /**
   * Color assigned to a principal user.
   * The color can be used by the application for personalizing
   * user specific UX elements.
   *
   * @type {string}
   * @memberof PrincipalInfo
   */
  public color!: string;

  /**
   * A role participant has in the meeting.
   *
   * @type {string}
   * @memberof ParticipantInfo
   */
  public role!: PredefinedRole;

  /**
   * Gets or sets the timestamp when the attendee joined the meeting.
   *
   * @type {Date}
   * @memberof ParticipantInfo
   */
  public joined?: Date;

  /**
   * Gets or sets the timestamp when the attendee left the meeting.
   *
   * @type {Date}
   * @memberof ParticipantInfo
   */
  public ended?: Date;
}
