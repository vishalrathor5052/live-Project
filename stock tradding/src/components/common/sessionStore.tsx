import { EncryptStorage } from "encrypt-storage";

export const StoreCookie = new EncryptStorage("StocktradingKeyHAS", {
  prefix: "@StockTrading",
  storageType: "sessionStorage",
});
