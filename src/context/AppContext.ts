import { ContextParam } from './ContextParam';
import { HostContext } from './HostContext';
import { MeetContext } from './MeetContext';
import { UserContext } from './UserContext';

export class AppContext {
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

  public toParams = (): ContextParam[] => {
    const params: ContextParam[] = [];

    if (this.user) {
      this.user.toParams().forEach((p) => params.push(p));
    }

    if (this.meet) {
      this.meet.toParams().forEach((p) => params.push(p));
    }

    return params;
  };
}
