/// <reference types="vite/client" />

declare module 'redux-persist-cookie-storage' {
  import 'cookies-js';
  interface Options {
    keyPrefix?: string;
    indexKey?: string;
    expiration?: {
      default: number | null;
      [key: string]: number | null;
    };
    setCookieOptions?: CookieOptions;
  }
  export class CookieStorage {
    constructor(cookies: CookiesStatic, option?: Options);

    getItem(
      key: string,
      callback: (error: null, result: string) => void,
    ): Promise<string>;

    setItem(
      key: string,
      value: string,
      callback: (error: null) => void,
    ): Promise<null>;

    removeItem(key: string, callback: (error: null) => void): Promise<null>;

    getAllKeys(
      callback: (error: null) => void,
    ): Promise<Record<string, string>>;
  }
}
