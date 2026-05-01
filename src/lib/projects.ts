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
};

export const projects: Project[] = [
  {
    id: "baner-configurator",
    number: "01",
    title: "BANER Configurator",
    category: "Configurator",
    description:
      "Operational interface for managing dynamic promotional banners within a production system. The project focused on translating business needs into system rules, safe states, and controlled UI behavior.",
    image: {
      src: "https://cdn.prod.website-files.com/697fa75c9246c7e0901d6165/697fc6a39465462bce545691_Zrzut%20ekranu%202026-02-1%20o%2022.30.42.png",
      alt: "Preview of the BANER configuration interface showing the banner list and form",
      width: 1600,
      height: 1000,
    },
    primaryLink: {
      label: "View case study",
      href: "/baner-configurator",
    },
  },
  {
    id: "panel-e-doreczenia",
    number: "02",
    title: "PANEL E-DORĘCZENIA",
    category: "Administrative interface",
    description:
      "Administrative interface designed for managing digital delivery services within a public sector system. The project involved complex workflows, system constraints, and integration with existing government infrastructure.",
    image: {
      src: "https://cdn.prod.website-files.com/697fa75c9246c7e0901d6165/698229dae7fc8c9d147870f8_e-dor2.png",
      alt: "Preview of the e-Doręczenia administrative panel interface",
      width: 1600,
      height: 1000,
    },
    status: "Case study in progress",
    statusNote:
      "Selected interactive prototypes available via official government design documentation.",
    secondaryLinks: [
      {
        label: "Mobile prototype",
        href: "https://ftffor.axshare.com/#id=znp66e&p=uxmb-3-a__m__twoje_skrzynki__kowalski_-_nieaktywna&dp=0&g=1",
        external: true,
      },
      {
        label: "Desktop prototype",
        href: "https://ow5vks.axshare.com/?id=n7mvfv&p=twoje_skrzynki&g=1",
        external: true,
      },
    ],
  },
];
