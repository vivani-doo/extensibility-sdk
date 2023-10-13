import { PredefinedLocale } from '../enums/PredefinedLocale';
import { LocalizedString } from '../i18n/LocalizedString';

export const getLocalizedString = (value: LocalizedString, locale: PredefinedLocale): string => {
  let localizedValue: string | undefined;

  switch (locale) {
    case PredefinedLocale.DE:
      localizedValue = value.de;
      break;
    case PredefinedLocale.EN:
      localizedValue = value.en;
      break;
    case PredefinedLocale.FR:
      localizedValue = value.fr;
      break;
    case PredefinedLocale.IT:
      localizedValue = value.it;
      break;
    case PredefinedLocale.PL:
      localizedValue = value.pl;
      break;
    case PredefinedLocale.SR_CYRL:
      localizedValue = value.srCyrl;
      break;
    case PredefinedLocale.SR_LATN:
      localizedValue = value.srLatn;
      break;
    default:
      throw new Error('Unsupported locale');
  }

  if (!localizedValue) {
    localizedValue = value.en;
  }

  return localizedValue;
};
