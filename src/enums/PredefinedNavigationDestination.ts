/**
 * List of navigation destinations which addon can request
 * from Meet host to be navigated to
 *
 * @export
 * @enum {number}
 */
export enum PredefinedNavigationDestination {
  /**
   * This navigation destination represents the canvas addon.
   * id parameter will contain an addon identifier value.
   */
  CANVAS,

  /**
   * This navigation destination represents the panel addon.
   * id parameter will contain an addon identifier value.
   */
  PANEL,

  SNAPSHOT,

  SETTINGS,
}
