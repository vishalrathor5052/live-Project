import { EncryptStorage } from "encrypt-storage";

export const StoreCookie: any = new EncryptStorage("TCADMINKeyHAS", {
  prefix: "@tcadmin",
  storageType: "sessionStorage",
});
