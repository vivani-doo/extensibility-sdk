import { PredefinedAddonActivateMode } from '../enums/PredefinedAddonActivateMode';
import { PredefinedAddonInactiveMode } from '../enums/PredefinedAddonInactiveMode';

export class ManifestRuntime {
  /**
   * Defines the addon behavior when it becomes inactive
   * where it can become hidden (default behavior) or
   * switch to mini mode 200px width (eg. call screen).
   *
   * @type {PredefinedAddonInactiveMode}
   * @memberof Manifest
   */
  public inactiveMode: PredefinedAddonInactiveMode = PredefinedAddonInactiveMode.HIDDEN;

  /**
   * Gets or sets the value determining if addon should be preloaded on meet initialization.
   * If <c>false</c> addon will be loaded only on navigation to its workspace
   *
   * @type {PredefinedAddonActivateMode}
   * @memberof Manifest
   */
  public activateMode: PredefinedAddonActivateMode = PredefinedAddonActivateMode.AD_HOC;
}
