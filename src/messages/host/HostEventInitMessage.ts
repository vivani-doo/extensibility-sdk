import { ConfigurationValue } from '../../configuration/ConfigurationValue';
import { ContextParam } from '../../context/ContextParam';
import { UrlParam } from '../../context/UrlParam';
import { PredefinedLocale } from '../../enums/PredefinedLocale';
import { PredefinedTheme } from '../../enums/PredefinedTheme';
import { Manifest } from '../../manifest/Manifest';
import { Message } from '../Message';
import { MessageType } from '../MessageType';

/**
 * Message sent from host to client containing in its payload the context information
 * client needs to initialize addon experience.
 *
 * @export
 * @class HostEventInitMessage
 * @extends {Message}
 */
export class HostEventInitMessage extends Message {
  /**
   *Creates an instance of InitMessage.
   * @memberof HostEventInitMessage
   */
  constructor() {
    super(MessageType.HOST_EVENT_INIT);
  }

  /**
   * An application manifest definition used to initialize this extension.
   *
   * @type {Application}
   * @memberof HostEventInitMessage
   */
  manifest!: Manifest;

  /**
   * Optional section containing configuration values
   * provided by user.
   *
   * @type {ConfigurationItem[]}
   * @memberof HostEventInitMessage
   */
  configuration: ConfigurationValue[] = [];

  /**
   * Collection of the context parameters
   *
   * @type {ContextParam[]}
   * @memberof HostEventInitMessage
   */
  context: ContextParam[] = [];

  /**
   * Language locale to be used in rendering addon.
   *
   * @type {Locale}
   * @memberof HostEventInitMessage
   */
  locale: PredefinedLocale = PredefinedLocale.EN;

  /**
   * Collection of window location search parameters
   * in the moment of loading addons
   *
   * @type {UrlParam[]}
   * @memberof HostEventInitMessage
   */
  locationSearchParams: UrlParam[] = [];

  /**
   * Session id value is generated on host and is unique per addon loading.
   * If can be used used to correlate events on server and addon and enable
   * e2e tracking or it can be used when reporting an addon issue to Meet.
   *
   * @type {string}
   * @memberof HostEventInitMessage
   */
  sessionId!: string;

  /**
   * A theme addon should be using in rendering.
   *
   * @type {PredefinedTheme}
   * @memberof HostEventInitMessage
   */
  theme: PredefinedTheme = PredefinedTheme.LIGHT;
}
