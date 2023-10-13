export enum MessageType {
  /**
   * Message sent from host to client containing in its payload the context information
   * client needs to initialize addon experience.
   */
  HOST_EVENT_INIT = 'host:event:init',
  /**
   * Message sent from host to addon containing the diagnostic info on addon loading
   */
  HOST_EVENT_DIAG = 'host:event:diag',
  /**
   * Message sent from the host to addon containing updated list of Meet participants
   * e.g. Display name, color, theme?
   */
  HOST_EVENT_PARTICIPANTS = 'host:event:participants',
  /**
   * Event message of this type os sent when host change the context in which addon
   * exists (theme change, fullscreen state, active addon, meeting state changed etc)
   */
  HOST_EVENT_STATE = 'host:event:state',
  /**
   * Host requests from addon to show its tooltips
   */
  HOST_REQUEST_TOOLTIPS = 'host:request:tooltips',

  /**
   * Message sent from client to host signalizing that the client is ready for initialization
   */
  CLIENT_EVENT_READY = 'client:event:ready',
  /**
   * Message sent from the addon to host requesting from host to update hosting environment
   */
  CLIENT_REQUEST_ENVIRONMENT = 'client:request:environment',
  /**
   * Message sent from client to host requesting host to update addon extension point adornment
   * (e.g. Tab title to "Messages(2)"")
   */
  // eslint-disable-next-line no-unused-vars
  CLIENT_REQUEST_DECORATE = 'client:request:decorate',
  /**
   * Message sent from client to host requesting host to notify user about a message client has.
   * (e.g. requesting from host to show a toast informing user that addon had an error)
   */
  CLIENT_REQUEST_NOTIFY = 'client:request:notify',
  /**
   * Message sent from the addon to host requesting host to navigate its iframe to another Meet page.
   */
  CLIENT_REQUEST_NAVIGATE = 'client:request:navigate',

  /**
   * Event sent from host to addons requesting them to
   * load a previously saved snapshot for a given
   * snapshot id.
   */
  CLIENT_REQUEST_SNAPSHOT = 'client:request:snapshot',
}
