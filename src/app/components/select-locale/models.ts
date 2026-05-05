import { LOCALES_DATA } from "./constants";

export type LocaleDataMap = Record<string, Record<string, string[]>>;
export type State  = keyof typeof LOCALES_DATA;
export type City<S extends State> = keyof (typeof LOCALES_DATA)[S];