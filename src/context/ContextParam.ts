import { AllContextKeys } from './keys/AllContextKeys';

export class ContextParam {
  /**
   * Parameter key
   *
   * @type {AllContextKeys}
   * @memberof ContextParam
   */
  public key: AllContextKeys;

  /**
   * Parameter value
   *
   * @type {string}
   * @memberof ContextParam
   */
  public value: string | null;

  /**
   * Creates an instance of ContextParam.
   * @param {AllContextKeys} key
   * @param {string} value
   * @memberof ContextParam
   */
  constructor(key: AllContextKeys, value: string | null) {
    this.key = key;
    this.value = value;
  }
}
