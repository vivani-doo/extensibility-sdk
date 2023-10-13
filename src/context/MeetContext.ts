import { ContextParam } from './ContextParam';
import { MeetContextKeys } from './keys/MeetContextKeys';

export class MeetContext {
  /**
   * Current Meet code
   *
   * @type {string}
   * @memberof MeetContext
   */
  public code?: string | null;

  /**
   * Current meet title
   *
   * @type {string}
   * @memberof MeetContext
   */
  public title?: string | null;

  /**
   * Attempts to initialize the opportunity context with a given parameter.
   *
   * @memberof OpportunityContext
   */
  initFrom = (param: ContextParam): boolean => {
    switch (param.key) {
      case MeetContextKeys.CODE:
        this.code = param.value;
        break;
      case MeetContextKeys.TITLE:
        this.title = param.value!;
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
        key: MeetContextKeys.CODE,
        value: this.code,
      });
    }
    if (this.title) {
      params.push({
        key: MeetContextKeys.TITLE,
        value: this.title,
      });
    }

    return params;
  }
}
