import { LocalizedString } from '../i18n/LocalizedString';

export class ManifestConfigurationItem {
  /**
   * Gets or sets the configuration key.
   *
   * @type {string}
   * @memberof ManifestConfigurationItem
   */
  public key!: string;

  /**
   * Gets or sets the default values.
   *
   * @type {string}
   * @memberof ManifestConfigurationItem
   */
  public defaultValue!: string;

  /**
   * Gets or sets the configuration value data type.
   *
   * @type {("Text" | "Boolean" | "Option" | "Multiselect")}
   * @memberof ManifestConfigurationItem
   */
  public dataType!: 'Text' | 'Boolean' | 'Option' | 'Multiselect';

  /**
   * Gets or sets the acceptable values.
   *
   * @type {string[]}
   * @memberof ManifestConfigurationItem
   */
  public acceptableValues: string[] = [];

  /**
   * Gets or sets the localized title explaining the purpose o configuration value to users.
   *
   * @type {LocalizedItem}
   * @memberof ManifestConfigurationItem
   */
  public title!: LocalizedString;

  /**
   * Gets or sets the localized description explaining the purpose o configuration value to users.
   *
   * @type {LocalizedItem}
   * @memberof ManifestConfigurationItem
   */
  public description!: LocalizedString;
}
