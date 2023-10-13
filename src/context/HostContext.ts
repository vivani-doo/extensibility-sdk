import { ConfigurationValue } from '../configuration/ConfigurationValue';
import { PredefinedEnvironment } from '../enums/PredefinedEnvironment';
import { PredefinedLocale } from '../enums/PredefinedLocale';
import { PredefinedTheme } from '../enums/PredefinedTheme';
import { TokenInfo } from './TokenInfo';
import { UrlParam } from './UrlParam';

export class HostContext {
  public configuration?: ConfigurationValue[];

  public locale: PredefinedLocale = PredefinedLocale.EN;

  public theme: PredefinedTheme = PredefinedTheme.SYSTEM;

  public urlParams?: UrlParam[];

  /**
   * Host environment
   *
   * @type {PredefinedEnvironment}
   * @memberof HostContext
   */
  public environment!: PredefinedEnvironment;

  /**
   * Host version
   *
   * @type {string}
   * @memberof HostContext
   */
  public version!: string;

  /**
   * Meet API access token (constrained to this session)
   *
   * @type {TokenInfo}
   * @memberof HostContext
   */
  public token!: TokenInfo;
}
