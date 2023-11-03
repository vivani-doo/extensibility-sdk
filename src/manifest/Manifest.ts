import { AllContextKeys } from '../context/keys/AllContextKeys';
import { type ManifestAuthor } from './ManifestAuthor';
import { type ManifestConfigurationItem } from './ManifestConfigurationItem';
import { type ManifestHost } from './ManifestHost';
import { type ManifestRuntime } from './ManifestRuntime';
import { type ManifestStore } from './ManifestStore';

export class Manifest {
  /**
   * Information about addon author shown in a store.
   *
   * @type {ManifestAuthor}
   * @memberof Manifest
   */
  public author!: ManifestAuthor;

  /**
   * Collection of configuration values to be provided by user during the installation of the addon
   *
   * @type {ManifestConfigurationItem[]}
   * @memberof Manifest
   */
  public configuration: ManifestConfigurationItem[] = [];

  /**
   * Collection of contextual property keys to be provided to addon during the runtime
   *
   * @type {AllContextKeys[]}
   * @memberof Manifest
   */
  public context: AllContextKeys[] = [];

  /**
   * Addon hosting information
   *
   * @type {ManifestHost}
   * @memberof Manifest
   */
  public host!: ManifestHost;

  /**
   * Definition of runtime addon behavior
   *
   * @type {ManifestRuntime}
   * @memberof Manifest
   */
  public runtime!: ManifestRuntime;

  /**
   * Addon store definition
   *
   * @type {ManifestStore}
   * @memberof Manifest
   */
  public store!: ManifestStore;
}
