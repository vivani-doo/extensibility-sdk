export enum MessageType {
  /**
   * Message sent from client to host signalizing that the client is ready for initialization
   */
  READY = 'meet:sdk:ready',
  /**
   * Message sent from host to client containing in its payload the context information
   * client needs to initialize addon experience.
   */
  INIT = 'meet:sdk:init',
  /**
   * Message sent from the addon to host requesting from host to update hosting environment
   */
  REQUEST_ENVIRONMENT_UPDATE = 'meet:sdk:environment',
  /**
   * Message sent from client to host requesting host to update addon extension point adornment
   * (e.g. Tab title to "Messages(2)"")
   */
  // eslint-disable-next-line no-unused-vars
  REQUEST_DECORATION_UPDATE = 'meet:sdk:decorate',

  /**
   * Message sent from client to host requesting host to notify user about a message client has.
   * (e.g. requesting from host to show a toast informing user that addon had an error)
   */
  REQUEST_NOTIFY = 'meet:sdk:notify',
  /**
   * Message sent from the addon to host requesting host to navigate its iframe to another Meet page.
   */
  REQUEST_NAVIGATE = 'meet:sdk:navigate',

  /**
   * Message sent from host to addon containing the diagnostic info on addon loading
   */
  HOST_LOAD_INFO = 'meet:host:load',
}
