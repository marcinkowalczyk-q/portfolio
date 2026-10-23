import type { Locale } from "@/i18n";

export type ProjectLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  primaryLink?: ProjectLink;
  secondaryLinks?: ProjectLink[];
  status?: string;
  statusNote?: string;
  featured?: boolean;
  imageFirst?: boolean;
};

const IMAGE_1 = {
  src: "/images/configurator.png",
  alt: "Monitor showing the Dynamic Content Configurator interface with the banner list panel",
  width: 672,
  height: 420,
};

const IMAGE_2 = {
  src: "/images/edor.png",
  alt: "Laptop and mobile phone showing the e-Doreczennia administrative panel interface",
  width: 672,
  height: 420,
};

const PROTOTYPE_LINKS = {
  mobile: {
    href: "https://ftffor.axshare.com/#id=znp66e&p=uxmb-3-a__m__twoje_skrzynki__kowalski_-_nieaktywna&dp=0&g=1",
    external: true,
  },
  desktop: {
    href: "https://ow5vks.axshare.com/?id=n7mvfv&p=twoje_skrzynki&g=1",
    external: true,
  },
};

export function getProjects(locale: Locale): Project[] {
  const isPl = locale === "pl";

  return [
    {
      id: "banner-configurator",
      number: "01",
      title: "Dynamic Content Configurator",
      category: isPl ? "Konfigurator dla Wakacje.pl" : "Configurator for Wakacje.pl",
      description: isPl
        ? "Narzędzie operacyjne do zarządzania dynamicznymi banerami promocyjnymi w systemie produkcyjnym. Projekt polegał na przełożeniu potrzeb biznesowych na reguły systemowe, bezpieczne stany i kontrolowane zachowanie UI."
        : "Operational interface for managing dynamic promotional banners within a production system. The project focused on translating business needs into system rules, safe states, and controlled UI behavior.",
      image: IMAGE_1,
      primaryLink: {
        label: isPl ? "Zobacz case study →" : "View case study →",
        href: `/${locale}/banner-configurator`,
      },
      featured: true,
    },
    {
      id: "panel-e-doreczenia",
      number: "02",
      title: "e-Doręczenia",
      category: isPl ? "Administrative interface" : "Administrative interface",
      description: isPl
        ? "Administrative interface do zarządzania usługą doręczeń elektronicznych w systemie publicznym. Projekt obejmował złożone przepływy, ograniczenia systemowe i integrację z istniejącą infrastrukturą administracji."
        : "Administrative interface designed for managing digital delivery services within a public sector system. The project involved complex workflows, system constraints, and integration with existing government infrastructure.",
      image: IMAGE_2,
      imageFirst: true,
      status: isPl ? "Case study w przygotowaniu" : "Case study in progress",
      statusNote: isPl
        ? "Wybrane prototypy interaktywne dostępne w oficjalnej dokumentacji projektowej administracji."
        : "Selected interactive prototypes available via official government design documentation.",
      secondaryLinks: [
        {
          label: isPl ? "Prototyp mobilny ↗" : "Mobile prototype ↗",
          ...PROTOTYPE_LINKS.mobile,
        },
        {
          label: isPl ? "Prototyp desktopowy ↗" : "Desktop prototype ↗",
          ...PROTOTYPE_LINKS.desktop,
        },
      ],
    },
  ];
}
