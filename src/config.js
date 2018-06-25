export const isDev = true && /^(192|0|127|localhost)/.test(location.hostname);
export const API_BASE_URL = isDev
  ? "http://192.168.0.202:19530"
  : "https://api.finbtc.net/";
