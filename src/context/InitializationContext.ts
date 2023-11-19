import { ConfigurationValue } from '../configuration/ConfigurationValue';
import { PredefinedLocale } from '../enums/PredefinedLocale';
import { PredefinedMeetingState } from '../enums/PredefinedMeetingState';
import { PredefinedRole } from '../enums/PredefinedRole';
import { PredefinedTheme } from '../enums/PredefinedTheme';
import { HostContext } from './HostContext';
import { MeetContext } from './MeetContext';
import { ParticipantInfo } from './ParticipantInfo';
import { SessionInfo } from './SessionInfo';
import { TenantContext } from './TenantContext';
import { UserContext } from './UserContext';

export class InitializationContext {
  /**
   * Zero or more configuration values sent from host which addon
   * should use to initialize itself
   *
   * @type {ConfigurationValue[]}
   * @memberof InitializationContext
   */
  public configuration?: ConfigurationValue[] = [];

  /**
   * Session id value is generated on host and is unique per addon loading.
   * If can be used used to correlate events on server and addon and enable
   * e2e tracking or it can be used when reporting an addon issue to Meet.
   *
   * @type {string}
   * @memberof InitializationContext
   */
  public sessionId!: string;

  /**
   * User context  (if user granted permissions)
   *
   * @type {UserContext}
   * @memberof InitializationContext
   */
  public user?: UserContext;

  /**
   * Meet addon hosting context
   *
   * @type {HostContext}
   * @memberof InitializationContext
   */
  public host!: HostContext;

  /**
   * Meet context  (if user granted permissions)
   *
   * @type {MeetContext}
   * @memberof InitializationContext
   */
  public meet?: MeetContext;

  /**
   * Session context
   *
   * @type {SessionInfo}
   * @memberof InitializationContext
   */
  public session!: SessionInfo;

  /**
   *  State of the meeting in the moment of the addon initialization
   *
   * @type {PredefinedMeetingState}
   * @memberof InitializationContext
   */
  state!: PredefinedMeetingState;

  /**
   * Collection of Meet participants in the moment when addon is initialized
   *
   * @type {ParticipantInfo[]}
   * @memberof InitializationContext
   */
  participants: ParticipantInfo[] = [];

  /**
   * Tenant context (if user granted permissions)
   *
   * @type {TenantContext}
   * @memberof InitializationContext
   */
  tenant?: TenantContext;

  /**
   * Culture locale
   *
   * @type {PredefinedLocale}
   * @memberof InitializationContext
   */
  locale!: PredefinedLocale;

  /**
   * Current theme
   *
   * @type {PredefinedTheme}
   * @memberof InitializationContext
   */
  theme!: PredefinedTheme;

  /**
   * Host API version
   *
   * @type {string}
   * @memberof InitializationContext
   */
  version!: string;

  /**
   * User role in the current Meet
   *
   * @type {PredefinedRole}
   * @memberof InitializationContext
   */
  role!: PredefinedRole;
}
