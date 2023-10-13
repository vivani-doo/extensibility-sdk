export class Task<T> {
  public promise!: Promise<T>;
  public onfulfilled!: (value: T) => void;
  public onrejected?: (reason: any) => void;
}
