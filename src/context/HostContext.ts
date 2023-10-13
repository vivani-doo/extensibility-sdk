import { ConfigurationValue } from '../configuration/ConfigurationValue';
import { PredefinedLocale } from '../enums/PredefinedLocale';
import { PredefinedTheme } from '../enums/PredefinedTheme';
import { UrlParam } from './UrlParam';

export class HostContext {
  public configuration?: ConfigurationValue[];

  public locale: PredefinedLocale = PredefinedLocale.EN;

  public theme: PredefinedTheme = PredefinedTheme.SYSTEM;

  public urlParams?: UrlParam[];
}
