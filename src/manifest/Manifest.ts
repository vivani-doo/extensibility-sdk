import { type ManifestAuthor } from './ManifestAuthor';
import { type ManifestConfigurationItem } from './ManifestConfigurationItem';
import { type ManifestHost } from './ManifestHost';
import { type ManifestRuntime } from './ManifestRuntime';
import { type ManifestStore } from './ManifestStore';

export class Manifest {
  public author!: ManifestAuthor;

  public configuration: ManifestConfigurationItem[] = [];

  public host!: ManifestHost;

  public runtime!: ManifestRuntime;

  public store!: ManifestStore;
}
