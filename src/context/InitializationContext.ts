import { ConfigurationValue } from '../configuration/ConfigurationValue';
import { PredefinedMeetingState } from '../enums/PredefinedMeetingState';
import { HostContext } from './HostContext';
import { MeetContext } from './MeetContext';
import { ParticipantInfo } from './ParticipantInfo';
import { SessionContext } from './SessionContext';
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
   * User context
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
   * Meet context
   *
   * @type {MeetContext}
   * @memberof InitializationContext
   */
  public meet?: MeetContext;

  /**
   * Session context
   *
   * @type {SessionContext}
   * @memberof InitializationContext
   */
  public session!: SessionContext;

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
}
