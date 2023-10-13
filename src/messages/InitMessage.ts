import { ConfigurationValue } from '../configuration/ConfigurationValue';
import { ContextParam } from '../context/ContextParam';
import { UrlParam } from '../context/UrlParam';
import { PredefinedLocale } from '../enums/PredefinedLocale';
import { PredefinedTheme } from '../enums/PredefinedTheme';
import { Manifest } from '../manifest/Manifest';
import { Message } from './Message';
import { MessageType } from './MessageType';

export class InitMessage extends Message {
  /**
   *Creates an instance of InitMessage.
   * @memberof InitMessage
   */
  constructor() {
    super(MessageType.INIT);
  }

  /**
   * An application manifest definition used to initialize this extension.
   *
   * @type {Application}
   * @memberof InitMessage
   */
  manifest!: Manifest;

  /**
   * Optional section containing configuration values
   * provided by user.
   *
   * @type {ConfigurationItem[]}
   * @memberof InitMessage
   */
  configuration: ConfigurationValue[] = [];

  /**
   * Collection of the context parameters
   *
   * @type {ContextParam[]}
   * @memberof InitMessage
   */
  context: ContextParam[] = [];

  /**
   * Language locale to be used in rendering addon.
   *
   * @type {Locale}
   * @memberof InitMessage
   */
  locale: PredefinedLocale = PredefinedLocale.EN;

  /**
   * Collection of window location search parameters
   * in the moment of loading addons
   *
   * @type {UrlParam[]}
   * @memberof InitMessage
   */
  locationSearchParams: UrlParam[] = [];

  /**
   * Session id value is generated on host and is unique per addon loading.
   * If can be used used to correlate events on server and addon and enable
   * e2e tracking or it can be used when reporting an addon issue to Meet.
   *
   * @type {string}
   * @memberof RuntimeContext
   */
  sessionId!: string;

  /**
   * A theme addon should be using in rendering.
   *
   * @type {PredefinedTheme}
   * @memberof InitMessage
   */
  theme: PredefinedTheme = PredefinedTheme.LIGHT;
}
