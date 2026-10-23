import en from "@/messages/en.json";
import pl from "@/messages/pl.json";

export type Locale = "en" | "pl";
export type T = typeof en;

export const locales: Locale[] = ["en", "pl"];
export const defaultLocale: Locale = "pl";

export function getT(locale: Locale): T {
  return locale === "en" ? en : (pl as T);
}

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
