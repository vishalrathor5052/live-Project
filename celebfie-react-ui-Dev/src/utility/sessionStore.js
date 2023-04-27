import { EncryptStorage } from 'encrypt-storage';


export const StoreCookie = new EncryptStorage('DynamicKeyHAS', {
    prefix: '@instance1',
    storageType: 'sessionStorage',
  });