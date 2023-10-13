import { ConfigurationValue } from '../configuration/ConfigurationValue';
import { PredefinedLocale } from '../enums/PredefinedLocale';
import { PredefinedTheme } from '../enums/PredefinedTheme';
import { Manifest } from '../manifest/Manifest';

export class RuntimeContext {
  /**
   *
   * An application definition used in operating this addon.
   *
   * @type {Application}
   * @memberof RuntimeContext
   */
  public manifest!: Manifest;

  public configuration?: ConfigurationValue[] = [];

  public locale: PredefinedLocale = PredefinedLocale.EN;

  /**
   * Addon host origin address.
   *
   * @type {string}
   * @memberof RuntimeContext
   */
  public origin?: string;

  /**
   * Session id value is generated on host and is unique per addon loading.
   * If can be used used to correlate events on server and addon and enable
   * e2e tracking or it can be used when reporting an addon issue to Meet.
   *
   * @type {string}
   * @memberof RuntimeContext
   */
  public sessionId!: string;

  public theme: PredefinedTheme = PredefinedTheme.LIGHT;
}

export default new RuntimeContext();
