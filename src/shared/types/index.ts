export type CallbackType = (...args: unknown[]) => unknown | Promise<unknown>;

export type OptionType<T> = {
  label: string;
  value: T;
};
