import { ConfigurationValue } from '../configuration/ConfigurationValue';
import { ContextParam } from './ContextParam';
import { HostContext } from './HostContext';
import { MeetContext } from './MeetContext';
import { SessionContext } from './SessionContext';
import { UserContext } from './UserContext';

export class AppContext {
  /**
   * Zero or more configuration values sent from host which addon
   * should use to initialize itself
   *
   * @type {ConfigurationValue[]}
   * @memberof AppContext
   */
  public configuration?: ConfigurationValue[] = [];

  /**
   * Session id value is generated on host and is unique per addon loading.
   * If can be used used to correlate events on server and addon and enable
   * e2e tracking or it can be used when reporting an addon issue to Meet.
   *
   * @type {string}
   * @memberof RuntimeContext
   */
  public sessionId!: string;

  /**
   * User context
   *
   * @type {UserContext}
   * @memberof MeetContext
   */
  public user?: UserContext;

  /**
   * Meet addon hosting context
   *
   * @type {HostContext}
   * @memberof MeetContext
   */
  public host!: HostContext;

  /**
   * Meet context
   *
   * @type {MeetContext}
   * @memberof AppContext
   */
  public meet?: MeetContext;

  /**
   * Session context
   *
   * @type {SessionContext}
   * @memberof AppContext
   */
  public session!: SessionContext;

  public toParams = (): ContextParam[] => {
    const params: ContextParam[] = [];

    if (this.user) {
      this.user.toParams().forEach((p) => params.push(p));
    }

    if (this.meet) {
      this.meet.toParams().forEach((p) => params.push(p));
    }

    if (this.session) {
      this.session.toParams().forEach((p) => params.push(p));
    }

    return params;
  };
}
