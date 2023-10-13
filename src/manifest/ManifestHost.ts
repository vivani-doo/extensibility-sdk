import { PredefinedHostType } from '../enums/PredefinedHostType';

export class ManifestHost {
  /**
   * Type of addon - canvas or panel?
   *
   * @type {PredefinedHostType}
   * @memberof ManifestHost
   */
  public type!: PredefinedHostType;

  /**
   * Url of the host which will serve the addon host page.
   *
   * @type {string}
   * @memberof ManifestHost
   */
  public url!: string;

  /**
   * Addon icon
   * (url or base64 string reprensentation )
   *
   * @type {string}
   * @memberof ManifestHosts
   */
  public icon!: string;

  /**
   * Addon icon (dark mode) - optional
   * (url or base64 string reprensentation )
   *
   * @type {string}
   * @memberof ManifestHosts
   */
  public iconDark?: string;
}
