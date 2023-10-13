import { ContextParam } from '../context/ContextParam';
import { MeetContextKeys } from '../context/keys/MeetContextKeys';
import { UserContextKeys } from '../context/keys/UserContextKeys';
import { PredefinedLocale } from '../enums/PredefinedLocale';
import { LocalizedString } from '../i18n/LocalizedString';
import { getLocalizedString, getUrlDomain, parameterizeUrl, tokenizeUrl } from './utils';

const usrIdParam = { key: UserContextKeys.ID, value: 'uid-123' };
const meetCodeParam = { key: MeetContextKeys.CODE, value: '112233' };
const queryParams: ContextParam[] = [usrIdParam, meetCodeParam];

describe('tokenizer tests', () => {
  test('untokenized url', () => {
    const url = 'https://someurl.com/test';
    const result = tokenizeUrl(url, queryParams);
    expect(result.url).toBe(url);
    expect(result.params).toBe(queryParams);
  });

  describe('full tokenization', () => {
    test('all params known - routes', () => {
      const url = 'https://someurl.com/{usr.id}/something/{meet.code}';
      const result = tokenizeUrl(url, queryParams);
      expect(result.url).toEqual('https://someurl.com/uid-123/something/112233');
      expect(result.params).toEqual([]);
    });

    test('all params known - params', () => {
      const url = 'https://someurl.com/something?oid={meet.code}&uid={usr.id}';
      const result = tokenizeUrl(url, queryParams);
      expect(result.url).toEqual('https://someurl.com/something?oid=112233&uid=uid-123');
      expect(result.params).toEqual([]);
    });

    test('all params known - routes and params', () => {
      const url = 'https://someurl.com/{usr.id}/something?oid={meet.code}';
      const result = tokenizeUrl(url, queryParams);
      expect(result.url).toEqual('https://someurl.com/uid-123/something?oid=112233');
      expect(result.params).toEqual([]);
    });
  });

  describe('partial tokenization', () => {
    test('some params known - routes', () => {
      const url = 'https://someurl.com/{usr.id}/something/{abc.id}';
      const result = tokenizeUrl(url, queryParams);
      expect(result.url).toEqual('https://someurl.com/uid-123/something/{abc.id}');
      expect(result.params).toEqual([meetCodeParam]);
    });

    test('some params known - params', () => {
      const url = 'https://someurl.com/something?oid={meet.code}&uid={abc.id}';
      const result = tokenizeUrl(url, queryParams);
      expect(result.url).toEqual('https://someurl.com/something?oid=112233&uid={abc.id}');
      expect(result.params).toEqual([usrIdParam]);
    });
  });
});

describe('parmeterization tests', () => {
  test('all the params are added as url params', () => {
    const url = 'https://someurl.com/test';
    const result = parameterizeUrl(url, queryParams);
    expect(result).toBe('https://someurl.com/test?usr.id=uid-123&meet.code=112233');
  });

  test('parametarization preserves fragment', () => {
    const url = 'https://someurl.com/webapp/index_dev.html?hc_reset#/Account/159978';
    const result = parameterizeUrl(url, queryParams);
    expect(result).toBe(
      'https://someurl.com/webapp/index_dev.html?hc_reset&usr.id=uid-123&meet.code=112233#/Account/159978',
    );
  });
});

describe('getUrlDomain tests', () => {
  test('url without the port will be stripped to domain', () => {
    const url = new URL('https://someurl.com/test');
    const result = getUrlDomain(url);
    expect(result).toBe('https://someurl.com');
  });

  test('url with the 443 port will be stripped to domain', () => {
    const url = new URL('https://someurl.com:443/test');
    const result = getUrlDomain(url);
    expect(result).toBe('https://someurl.com');
  });

  test('url with the custom port will be stripped to domain', () => {
    const url = new URL('https://someurl.com:123/test');
    const result = getUrlDomain(url);
    expect(result).toBe('https://someurl.com:123');
  });
});

describe('getLocalizedString tests', () => {
  test('will return exact string when possible', () => {
    const localizedString: LocalizedString = {
      en: 'ENGLISH',
      fr: 'FRENCH',
    };

    expect(getLocalizedString(localizedString, PredefinedLocale.FR)).toBe('FRENCH');
  });

  test('will default to english when english us not available', () => {
    const localizedString: LocalizedString = {
      en: 'ENGLISH',
    };

    expect(getLocalizedString(localizedString, PredefinedLocale.FR)).toBe('ENGLISH');
  });
});
