export interface SessionContext {
  /**
   * Identifier of the addon for which the
   * hashed participant info is valid for
   *
   * @type {string}
   * @memberof ParticipantInfo
   */
  addonIdentifier: string;

  addonSessionId: string;

  addonUserId: string;

  addonTenantId: string;

  /**
   * Session id value is generated on host and is unique per addon loading.
   * If can be used used to correlate events on server and addon and enable
   * e2e tracking or it can be used when reporting an addon issue to Meet.
   *
   * @type {string}
   * @memberof SessionContext
   */
  sessionId: string;
}
