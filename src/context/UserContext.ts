import { parseRole, PredefinedRole } from '../enums/PredefinedRole';
import { ContextParam } from './ContextParam';
import { UserContextKeys } from './keys/UserContextKeys';

export class UserContext {
  /**
   * Hashed addon identifer of the user
   *
   * @type {string}
   * @memberof UserContext
   */
  public id!: string;

  /**
   * Url of the participant avatar (if any).
   * Avatar can be undefined if user has no avatar or
   * choose in user privacy settings not to share it with addons.
   *
   * @type {string}
   * @memberof UserContext
   */
  public avatarUrl?: string | null;

  /**
   * Display name of the participant (if any).
   *
   * Display name can be undefined if user choose in
   * user privacy settings to not share it with addons.
   * @type {string}
   * @memberof UserContext
   */
  public displayName?: string | null;

  /**
   * Color assigned to a principal user.
   * The color can be used by the application for personalizing
   * user specific UX elements.
   *
   * @type {string}
   * @memberof UserContext
   */
  public color!: string;

  /**
   * Role participamnt has
   *
   * @type {PredefinedRole}
   * @memberof UserContext
   */
  public role!: PredefinedRole;

  /**
   * Attempts to initialize the opportunity context with a given parameter.
   *
   * @memberof OpportunityContext
   */
  initFrom = (param: ContextParam): boolean => {
    switch (param.key) {
      case UserContextKeys.COLOR:
        this.color = param.value!;
        break;
      case UserContextKeys.ID:
        this.id = param.value!;
        break;
      case UserContextKeys.DISPLAY_NAME:
        this.displayName = param.value;
        break;
      case UserContextKeys.ROLE:
        this.role = parseRole(param.value);
        break;
      default:
        return false;
    }

    return true;
  };

  public toParams(): ContextParam[] {
    const params: ContextParam[] = [];
    if (this.color) {
      params.push({
        key: UserContextKeys.COLOR,
        value: this.color,
      });
    }
    if (this.id) {
      params.push({
        key: UserContextKeys.ID,
        value: this.id,
      });
    }
    if (this.displayName) {
      params.push({
        key: UserContextKeys.DISPLAY_NAME,
        value: this.displayName,
      });
    }
    if (this.role) {
      params.push({
        key: UserContextKeys.ROLE,
        value: this.role.toString(),
      });
    }

    return params;
  }
}
