import type { Metadata } from "next";
import { getT, locales, defaultLocale, type Locale } from "@/i18n";

export const siteConfig = {
  email: "marcinkowalczyk.design@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/marcin-kowalczyk-85569714a",
} as const;

// Vercel sets the production domain at build time; swap in a custom domain there, not here
export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

// Every indexable route, without the locale prefix ("" = home)
export const routes = ["", "/banner-configurator", "/e-doreczenia", "/about", "/accessibility"] as const;
export type Route = (typeof routes)[number];

const ogLocale: Record<Locale, string> = { pl: "pl_PL", en: "en_US" };

// Canonical + hreflang links for one route; x-default goes to the default locale
export function alternatesFor(locale: Locale, route: Route): NonNullable<Metadata["alternates"]> {
  return {
    canonical: `/${locale}${route}`,
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, `/${l}${route}`])),
      "x-default": `/${defaultLocale}${route}`,
    },
  };
}

// Full page metadata. Pages build theirs here because Next replaces `openGraph`
// per page rather than merging it with the layout's.
export function pageMetadata({
  locale,
  route,
  title,
  description,
}: {
  locale: Locale;
  route: Route;
  title?: string;
  description?: string;
}): Metadata {
  const t = getT(locale);
  const desc = description ?? t["meta.description"];
  const ogTitle = title ? `${title} | Marcin Kowalczyk` : t["meta.title"];
  return {
    title: title ?? { absolute: t["meta.title"] },
    description: desc,
    alternates: alternatesFor(locale, route),
    openGraph: {
      type: "website",
      siteName: t["meta.siteName"],
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      url: `/${locale}${route}`,
      title: ogTitle,
      description: desc,
    },
    twitter: { card: "summary_large_image", title: ogTitle, description: desc },
  };
}
