import { PredefinedAddonCategory } from '../enums/PredefinedAddonCategory';
import { PredefinedStoreType } from '../enums/PredefinedStoreType';
import { LocalizedString } from '../i18n/LocalizedString';

export class ManifestStore {
  public category!: PredefinedAddonCategory;

  public description!: LocalizedString;

  /**
   * Unique addon identifier
   *
   * @type {string}
   * @memberof Manifest
   */
  public identifier!: string;

  public visibility: PredefinedStoreType = PredefinedStoreType.PUBLIC;

  public title!: LocalizedString;
}
