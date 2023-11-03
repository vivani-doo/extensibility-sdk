import { ContextParam } from './ContextParam';
import { TenantContextKeys } from './keys/TenantContextKeys';

export class TenantContext {
  /**
   * Tenant code
   *
   * @type {(string | null)}
   * @memberof TenantContext
   */
  public code?: string | null;

  /**
   *  Tenant organization email
   *
   * @type {(string | null)}
   * @memberof TenantContext
   */
  public email?: string | null;

  /**
   * Tenant name
   * @type {(string | null)}
   * @memberof TenantContext
   */
  public name?: string | null;

  /**
   * Attempts to initialize the opportunity context with a given parameter.
   *
   * @memberof OpportunityContext
   */
  initFrom = (param: ContextParam): boolean => {
    switch (param.key) {
      case TenantContextKeys.CODE:
        this.code = param.value;
        break;
      case TenantContextKeys.EMAIL:
        this.email = param.value;
        break;
      case TenantContextKeys.NAME:
        this.name = param.value;
        break;
      default:
        return false;
    }

    return true;
  };

  public toParams(): ContextParam[] {
    const params: ContextParam[] = [];
    if (this.code) {
      params.push({
        key: TenantContextKeys.CODE,
        value: this.code,
      });
    }
    if (this.email) {
      params.push({
        key: TenantContextKeys.EMAIL,
        value: this.email,
      });
    }
    if (this.name) {
      params.push({
        key: TenantContextKeys.NAME,
        value: this.name,
      });
    }

    return params;
  }
}
