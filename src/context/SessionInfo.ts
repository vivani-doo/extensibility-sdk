export class SessionInfo {
  /**
   * Identifier of the addon for which the
   * hashed participant info is valid for
   *
   * @type {string}
   * @memberof SessionInfo
   */
  public addonIdentifier!: string;

  public addonSessionId!: string;

  public addonUserId!: string;

  public addonTenantId!: string;
}
