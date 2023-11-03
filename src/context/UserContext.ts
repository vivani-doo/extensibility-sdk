import { ContextParam } from './ContextParam';
import { UserContextKeys } from './keys/UserContextKeys';

export class UserContext {
  /**
   *  User email
   *
   * @type {(string | null)}
   * @memberof UserContext
   */
  public email?: string | null;

  /**
   * Url of the participant avatar (if any).
   * Avatar can be undefined if user has no avatar or
   * choose in user privacy settings not to share it with addons.
   *
   * @type {(string | null)}
   * @memberof UserContext
   */
  public avatarUrl?: string | null;

  /**
   * First name of the participant (if any).
   *
   * @type {(string | null)}
   * @memberof UserContext
   */
  public firstName?: string | null;

  /**
   * Last  name of the participant (if any).
   *
   * @type {(string | null)}
   * @memberof UserContext
   */
  public lastName?: string | null;

  /**
   * Color assigned to a principal user.
   * The color can be used by the application for personalizing
   * user specific UX elements.
   *
   * @type {(string | null)}
   * @memberof UserContext
   */
  public color?: string | null;

  /**
   * Attempts to initialize the opportunity context with a given parameter.
   *
   * @memberof OpportunityContext
   */
  initFrom = (param: ContextParam): boolean => {
    switch (param.key) {
      case UserContextKeys.AVATAR_URL:
        this.avatarUrl = param.value;
        break;
      case UserContextKeys.COLOR:
        this.color = param.value;
        break;
      case UserContextKeys.EMAIL:
        this.email = param.value;
        break;
      case UserContextKeys.FIRST_NAME:
        this.firstName = param.value;
        break;
      case UserContextKeys.LAST_NAME:
        this.lastName = param.value;
        break;
      default:
        return false;
    }

    return true;
  };

  public toParams(): ContextParam[] {
    const params: ContextParam[] = [];
    if (this.avatarUrl) {
      params.push({
        key: UserContextKeys.AVATAR_URL,
        value: this.avatarUrl,
      });
    }
    if (this.color) {
      params.push({
        key: UserContextKeys.COLOR,
        value: this.color,
      });
    }
    if (this.email) {
      params.push({
        key: UserContextKeys.EMAIL,
        value: this.email,
      });
    }
    if (this.firstName) {
      params.push({
        key: UserContextKeys.FIRST_NAME,
        value: this.firstName,
      });
    }
    if (this.lastName) {
      params.push({
        key: UserContextKeys.LAST_NAME,
        value: this.lastName,
      });
    }

    return params;
  }
}
