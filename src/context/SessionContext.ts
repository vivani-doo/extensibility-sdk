import { ContextParam } from './ContextParam';
import { SessionContextKeys } from './keys/SessionContextKeys';

export class SessionContext {
  /**
   * Identifier of the addon for which the
   * hashed participant info is valid for
   *
   * @type {string}
   * @memberof ParticipantInfo
   */
  public addonIdentifier!: string;

  public addonSessionId!: string;

  public addonUserId!: string;

  public addonTenantId!: string;



  /**
   * Attempts to initialize the opportunity context with a given parameter.
   *
   * @memberof OpportunityContext
   */
  initFrom = (param: ContextParam): boolean => {
    switch (param.key) {
      case SessionContextKeys.ADDON_ID:
        this.addonIdentifier = param.value!;
        break;
      case SessionContextKeys.ADDON_SESSION_ID:
        this.addonSessionId = param.value!;
        break;
      case SessionContextKeys.ADDON_USER_ID:
        this.addonUserId = param.value!;
        break;
      case SessionContextKeys.ADDON_TENANT_ID:
        this.addonTenantId = param.value!;
        break;

      default:
        return false;
    }

    return true;
  };

  public toParams(): ContextParam[] {
    const params: ContextParam[] = [];
    if (this.addonIdentifier) {
      params.push({
        key: SessionContextKeys.ADDON_ID,
        value: this.addonIdentifier,
      });
    }
    if (this.addonSessionId) {
      params.push({
        key: SessionContextKeys.ADDON_SESSION_ID,
        value: this.addonSessionId,
      });
    }
    if (this.addonUserId) {
      params.push({
        key: SessionContextKeys.ADDON_USER_ID,
        value: this.addonUserId,
      });
    }
    if (this.addonTenantId) {
      params.push({
        key: SessionContextKeys.ADDON_TENANT_ID,
        value: this.addonTenantId,
      });
    }

    return params;
  }
}
