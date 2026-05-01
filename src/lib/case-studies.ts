export type CaseStudyImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type CaseStudySection = {
  heading: string;
  paragraphs: string[];
  images?: CaseStudyImage[];
  bullets?: string[];
};

export type CaseStudy = {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  intro?: string;
  sections: CaseStudySection[];
};

const ASSET = "https://cdn.prod.website-files.com/697fa75c9246c7e0901d6165";

export const banerCaseStudy: CaseStudy = {
  slug: "baner-configurator",
  number: "01",
  title: "BANNER",
  subtitle: "Configuration interface",
  metaTitle: "Banner Configuration Interface — UX Case Study",
  metaDescription:
    "UX case study of a banner configuration interface: translating business needs into system rules, safe states, and controlled UI behavior.",
  sections: [
    {
      heading: "Context",
      paragraphs: [
        "Business team needed independent management of promotional banners within offer listings. Previously, changes required developer support, slowing operations.",
        "Banners operated in critical product areas and had to respect existing configurator architecture, Design System, and SEO/performance constraints.",
      ],
    },
    {
      heading: "Challenge",
      paragraphs: [
        "Design challenge: create an interface enabling non-technical users to control dynamic UI elements without violating system rules.",
        "Solutions required balancing business speed, operational safety, existing architecture integration, and DS/SEO/performance compliance.",
      ],
    },
    {
      heading: "Working within constraints",
      paragraphs: [
        "The interface had to integrate into the existing configurator hub, leverage the current Design System, and avoid additional developer burden. All solutions required SEO and listing performance review.",
      ],
    },
    {
      heading: "Understanding the operational context",
      paragraphs: [
        "Analysis of banner management revealed the core issue wasn't visual design but lack of control and clear responsibility.",
        "No central overview existed, system states were undefined, mistake-prevention mechanisms were absent, and all changes required developer involvement.",
      ],
    },
    {
      heading: "From tasks to system logic",
      paragraphs: [
        "Operational issues were translated into a clearer system structure by defining behaviors across different situations.",
        "Identifying clear states, valid transitions, and configuration rules reduced developer dependency and increased predictability for users.",
      ],
      images: [
        {
          src: `${ASSET}/69827ab36f3bc6a16bad1b7f_Flowchart_1.png`,
          alt: "Flowchart mapping banner system states and valid transitions",
          width: 1600,
          height: 1000,
        },
      ],
    },
    {
      heading: "Designing within the Design System",
      paragraphs: [
        "The project used the existing Design System from inception, extending it with new variants for unsupported scenarios.",
        "The solution became a natural system extension, maintaining consistency and predictable behavior for dynamic content management.",
      ],
      images: [
        {
          src: `${ASSET}/698146762251005c447c657e_DS_view_2.png`,
          alt: "Design System component variants used by the banner configurator",
          width: 1600,
          height: 1000,
        },
        {
          src: `${ASSET}/6981467508114fb8590224b2_DS_view_1.png`,
          alt: "Additional Design System components extended for new scenarios",
          width: 1600,
          height: 1000,
        },
      ],
    },
    {
      heading: "Interaction flows as system definition",
      paragraphs: [
        "Flows defined system behavior rather than serving as visual screen maps, showing relationships between user actions, banner states, and product consequences.",
        "Diagrams included conditions, constraints, and exceptions, helping developers understand what is allowed or blocked in specific contexts.",
      ],
      images: [
        {
          src: `${ASSET}/6981c138868dd10a444a2412_Flow_1_1.png`,
          alt: "Interaction flow diagram with conditional branches and constraints",
          width: 1600,
          height: 1000,
        },
      ],
    },
    {
      heading: "Error prevention & operational safety",
      paragraphs: [
        "The interface prioritized mistake reduction through additional confirmation for critical actions, blocking active element removal, and clearly distinguishing deactivation from deletion.",
        "Form validation detected incorrect data (URL structure, field length, file format) before system-level changes — preventing rather than just handling errors.",
      ],
      images: [
        {
          src: `${ASSET}/6981d2e72cb06aeff72d6e91_Error_prevention_2.png`,
          alt: "Error prevention patterns: blocking destructive actions and inline validation",
          width: 1600,
          height: 1000,
        },
      ],
    },
    {
      heading: "System interface layers",
      paragraphs: [
        "The interface comprises connected layers supporting different stages of the management process rather than a single unified view.",
      ],
    },
    {
      heading: "Banner list — system overview",
      paragraphs: [
        "The list view functions as a control panel, displaying all banners, their states, and usage context to support informed operational decisions.",
      ],
      images: [
        {
          src: `${ASSET}/6981daf90f1843a906b824a1_Baner_list.png`,
          alt: "Banner list view with status, scope and usage context columns",
          width: 1600,
          height: 1000,
        },
      ],
    },
    {
      heading: "Configuration form — rule definition",
      paragraphs: [
        "The form defines banner operation parameters within system-defined constraints, functioning as a rules interface rather than a content creator.",
      ],
      images: [
        {
          src: `${ASSET}/6982863f4da9a2fa271b8d2f_Form_%40.png`,
          alt: "Banner configuration form with field validation and constraint hints",
          width: 1600,
          height: 1000,
        },
        {
          src: `${ASSET}/6981e9e81717a1e543906356_Main%20list.png`,
          alt: "Form context within the configurator hub overview",
          width: 1600,
          height: 1000,
        },
      ],
    },
    {
      heading: "Preview — system feedback",
      paragraphs: [
        "The preview layer provides feedback, showing how a configuration affects actual UI behavior in the product, reducing uncertainty and unwanted results.",
      ],
    },
    {
      heading: "Scenarios — behavior outcomes",
      paragraphs: [
        "Supporting content variants required considering multiple UI behavior scenarios, showing consequences of configuration decisions, not only visual variations.",
        "Scenarios presented different active element sets and layout impacts, predicting system reactions before implementation while serving as a team communication tool.",
      ],
      images: [
        {
          src: `${ASSET}/6981dd3ccc15f64048a0a762_Scenarios.png`,
          alt: "Scenario matrix illustrating different active elements and their layout impact",
          width: 1600,
          height: 1000,
        },
      ],
    },
    {
      heading: "Design documentation",
      paragraphs: [
        "Documentation covered scenarios, states, dependencies, and edge cases in Figma as the development source of truth.",
        "It addressed system behavior and logic alongside layouts — essential for rules-based rather than visual-structure-only implementation.",
      ],
      images: [
        {
          src: `${ASSET}/6981ed3bc033922ef31bd396_Documentation.png`,
          alt: "Figma documentation page covering states, dependencies and edge cases",
          width: 1600,
          height: 1000,
        },
      ],
    },
    {
      heading: "Takeaways",
      paragraphs: [
        "Operational tools require designing rules and constraints more than screens alone.",
        "The greatest value came from translating business needs into system models — enabling independent user work while protecting product quality.",
      ],
      bullets: [
        "UI acts as a control layer over system logic.",
        "Data validation and rules form the solution foundation.",
        "System constraints enable correct user action.",
        "Design System work increases consistency and predictability.",
      ],
    },
  ],
};

export const caseStudies: CaseStudy[] = [banerCaseStudy];
