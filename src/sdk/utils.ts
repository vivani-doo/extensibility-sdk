import { ContextParam } from '../context/ContextParam';
import { AllContextKeys } from '../context/keys/AllContextKeys';
import { PredefinedLocale } from '../enums/PredefinedLocale';
import { LocalizedString } from '../i18n/LocalizedString';
import { EventOrigin } from '../logging/EventOrigin';
import { EventType } from '../logging/EventType';
import logger from '../logging/Logger';
import { LogLevel } from '../logging/LogLevel';

/**
 * Tokenize url by replacing all token placeholders with matching context params.
 *
 * @memberof utils
 */
export const tokenizeUrl = (
  url: string,
  params: ContextParam[],
): {
  url: string;
  params: ContextParam[];
} => {
  const tokenizer = /{(.*?)}/g;
  let token = tokenizer.exec(url);
  while (token) {
    if (!token) {
      break;
    }
    const key = token[1];
    const tokenParam = params.find((p) => p.key.toString() === key);

    if (tokenParam && tokenParam.value) {
      url = url.replace(`{${key}}`, tokenParam.value);
      params = params.filter((p) => p !== tokenParam);
    }

    token = tokenizer.exec(url);
  }

  return {
    url,
    params,
  };
};

/**
 * Parameterize url by appending context params to the url parameters.
 *
 * @static
 * @memberof utils
 */
export const parameterizeUrl = (url: string, params: ContextParam[]): string => {
  const hostUrl = new URL(url);

  const hostParams = new URLSearchParams(hostUrl.searchParams);
  params.forEach((param) => hostParams.append(param.key, param.value ?? ''));
  const hostParamsString = hostParams.toString().replace('=&', '&');

  return `${getUrlDomain(hostUrl)}${hostUrl.pathname}?${hostParamsString}${hostUrl.hash}`;
};

export const getUrlDomain = (url: URL): string => {
  let originHost = `${url.protocol}//${url.hostname}`;

  if (url.port && url.port !== '443') {
    originHost += `:${url.port}`;
  }

  return originHost;
};

export const validHostOrigin = (origin: string): boolean => {
  if (!origin) {
    return false;
  }
  const valid = origin.endsWith('meet.rs') || origin.startsWith('https://localhost');

  if (!valid) {
    logger.current.log({
      origin: EventOrigin.ADDON,
      type: EventType.INTERNAL,
      level: LogLevel.Trace,
      message: '[CXT][AddonSdk]::validHostOrigin - invalid origin',
      context: [origin],
    });
    return false;
  }

  return true;
};

export const objectValues = (data: any) => {
  return Object.keys(data).map((key) => data[key]);
};

export const urlValidation = (url: string): boolean => {
  if (!url) {
    return false;
  }

  try {
    const validatedUrl = new URL(url).toString();
    if (validatedUrl === url) {
      return true;
    }

    if (validatedUrl.endsWith('/')) {
      const trimmedUrl = validatedUrl.substring(0, validatedUrl.length - 1);
      if (trimmedUrl === url) {
        return true;
      }
    }

    return false;
  } catch (e) {
    return false;
  }
};

export const emailValidation = (email: string): boolean => {
  if (!email) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const hostUrlValidation = (hostUrl: string, context: AllContextKeys[]): boolean => {
  const contextParams: ContextParam[] = [];
  context.forEach((key) => contextParams.push({ key, value: 'marker' }));

  try {
    const { url } = tokenizeUrl(hostUrl, contextParams);
    const validatedUrl = new URL(url);
    return validatedUrl.toString() === url;
  } catch (e) {
    return false;
  }
};

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
