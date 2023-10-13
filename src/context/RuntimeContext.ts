import { ConfigurationValue } from '../configuration/ConfigurationValue';
import { PredefinedLocale } from '../enums/PredefinedLocale';
import { PredefinedTheme } from '../enums/PredefinedTheme';
import { Manifest } from '../manifest/Manifest';
import { SessionContext } from './SessionContext';

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
   * Session runtime context of the addon being loaded
   *
   * @type {string}
   * @memberof RuntimeContext
   */
  public session!: SessionContext;

  public theme: PredefinedTheme = PredefinedTheme.LIGHT;
}

export default new RuntimeContext();
