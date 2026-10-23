import type { Locale } from "@/i18n";

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
  sections: CaseStudySection[];
};

const ASSET = "https://cdn.prod.website-files.com/697fa75c9246c7e0901d6165";

const IMAGES = {
  flowchart: { src: `${ASSET}/69827ab36f3bc6a16bad1b7f_Flowchart_1.png`, width: 1600, height: 1000 },
  ds1: { src: `${ASSET}/698146762251005c447c657e_DS_view_2.png`, width: 1600, height: 1000 },
  ds2: { src: `${ASSET}/6981467508114fb8590224b2_DS_view_1.png`, width: 1600, height: 1000 },
  flow1: { src: `${ASSET}/6981c138868dd10a444a2412_Flow_1_1.png`, width: 1600, height: 1000 },
  errorPrev: { src: `${ASSET}/6981d2e72cb06aeff72d6e91_Error_prevention_2.png`, width: 1600, height: 1000 },
  banerList: { src: `${ASSET}/6981daf90f1843a906b824a1_Baner_list.png`, width: 1600, height: 1000 },
  form1: { src: `${ASSET}/6982863f4da9a2fa271b8d2f_Form_%40.png`, width: 1600, height: 1000 },
  form2: { src: `${ASSET}/6981e9e81717a1e543906356_Main%20list.png`, width: 1600, height: 1000 },
  scenarios: { src: `${ASSET}/6981dd3ccc15f64048a0a762_Scenarios.png`, width: 1600, height: 1000 },
  docs: { src: `${ASSET}/6981ed3bc033922ef31bd396_Documentation.png`, width: 1600, height: 1000 },
};

const banerCaseStudyEn: CaseStudy = {
  slug: "banner-configurator",
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
      images: [{ ...IMAGES.flowchart, alt: "Flowchart mapping banner system states and valid transitions" }],
    },
    {
      heading: "Designing within the Design System",
      paragraphs: [
        "The project used the existing Design System from inception, extending it with new variants for unsupported scenarios.",
        "The solution became a natural system extension, maintaining consistency and predictable behavior for dynamic content management.",
      ],
      images: [
        { ...IMAGES.ds1, alt: "Design System component variants used by the banner configurator" },
        { ...IMAGES.ds2, alt: "Additional Design System components extended for new scenarios" },
      ],
    },
    {
      heading: "Interaction flows as system definition",
      paragraphs: [
        "Flows defined system behavior rather than serving as visual screen maps, showing relationships between user actions, banner states, and product consequences.",
        "Diagrams included conditions, constraints, and exceptions, helping developers understand what is allowed or blocked in specific contexts.",
      ],
      images: [{ ...IMAGES.flow1, alt: "Interaction flow diagram with conditional branches and constraints" }],
    },
    {
      heading: "Error prevention & operational safety",
      paragraphs: [
        "The interface prioritized mistake reduction through additional confirmation for critical actions, blocking active element removal, and clearly distinguishing deactivation from deletion.",
        "Form validation detected incorrect data (URL structure, field length, file format) before system-level changes — preventing rather than just handling errors.",
      ],
      images: [{ ...IMAGES.errorPrev, alt: "Error prevention patterns: blocking destructive actions and inline validation" }],
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
      images: [{ ...IMAGES.banerList, alt: "Banner list view with status, scope and usage context columns" }],
    },
    {
      heading: "Configuration form — rule definition",
      paragraphs: [
        "The form defines banner operation parameters within system-defined constraints, functioning as a rules interface rather than a content creator.",
      ],
      images: [
        { ...IMAGES.form1, alt: "Banner configuration form with field validation and constraint hints" },
        { ...IMAGES.form2, alt: "Form context within the configurator hub overview" },
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
      images: [{ ...IMAGES.scenarios, alt: "Scenario matrix illustrating different active elements and their layout impact" }],
    },
    {
      heading: "Design documentation",
      paragraphs: [
        "Documentation covered scenarios, states, dependencies, and edge cases in Figma as the development source of truth.",
        "It addressed system behavior and logic alongside layouts — essential for rules-based rather than visual-structure-only implementation.",
      ],
      images: [{ ...IMAGES.docs, alt: "Figma documentation page covering states, dependencies and edge cases" }],
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

const banerCaseStudyPl: CaseStudy = {
  slug: "banner-configurator",
  number: "01",
  title: "BANNER",
  subtitle: "Interfejs konfiguracyjny",
  metaTitle: "Interfejs konfiguracji banerów — case study UX",
  metaDescription:
    "Case study UX interfejsu konfiguracji banerów: przełożenie potrzeb biznesowych na reguły systemowe, bezpieczne stany i kontrolowane zachowanie UI.",
  sections: [
    {
      heading: "Kontekst",
      paragraphs: [
        "Zespół biznesowy potrzebował możliwości samodzielnego zarządzania banerami promocyjnymi na listingach ofert. Wcześniej każda zmiana wymagała zaangażowania dewelopera, co spowalniało operacje.",
        "Banery działały w krytycznych obszarach produktu i musiały respektować istniejącą architekturę konfiguratora, Design System oraz ograniczenia SEO i wydajności.",
      ],
    },
    {
      heading: "Wyzwanie",
      paragraphs: [
        "Wyzwanie projektowe: stworzyć interfejs, który pozwoli użytkownikom bez technicznego przygotowania sterować dynamicznymi elementami UI — bez naruszania reguł systemu.",
        "Rozwiązania musiały godzić szybkość biznesową, bezpieczeństwo operacyjne, integrację z istniejącą architekturą oraz zgodność z Design Systemem, SEO i wydajnością.",
      ],
    },
    {
      heading: "Praca w ramach ograniczeń",
      paragraphs: [
        "Interfejs musiał wpisać się w istniejący hub konfiguratora, korzystać z aktualnego Design Systemu i nie generować dodatkowej pracy po stronie developerów. Każde rozwiązanie wymagało przeglądu pod kątem SEO i wydajności listingów.",
      ],
    },
    {
      heading: "Rozumienie kontekstu operacyjnego",
      paragraphs: [
        "Analiza zarządzania banerami ujawniła, że główny problem nie leżał w warstwie wizualnej, lecz w braku kontroli i jasnego podziału odpowiedzialności.",
        "Nie istniał żaden centralny przegląd, stany systemu były niezdefiniowane, nie było mechanizmów zapobiegania błędom, a każda zmiana wymagała udziału dewelopera.",
      ],
    },
    {
      heading: "Od zadań do logiki systemu",
      paragraphs: [
        "Problemy operacyjne przełożono na klarowniejszą strukturę systemu, definiując zachowania w różnych sytuacjach.",
        "Określenie jasnych stanów, poprawnych przejść i reguł konfiguracyjnych zmniejszyło zależność od developerów i zwiększyło przewidywalność systemu dla użytkowników.",
      ],
      images: [{ ...IMAGES.flowchart, alt: "Flowchart mapujący stany systemu banerów i poprawne przejścia między nimi" }],
    },
    {
      heading: "Projektowanie w ramach Design Systemu",
      paragraphs: [
        "Projekt od początku opierał się na istniejącym Design Systemie, rozszerzając go o nowe warianty dla scenariuszy, których system dotąd nie obsługiwał.",
        "Rozwiązanie stało się naturalnym rozszerzeniem systemu — utrzymując spójność i przewidywalne zachowanie przy zarządzaniu dynamiczną treścią.",
      ],
      images: [
        { ...IMAGES.ds1, alt: "Warianty komponentów Design Systemu użyte w konfiguratorze banerów" },
        { ...IMAGES.ds2, alt: "Dodatkowe komponenty Design Systemu rozszerzone na nowe scenariusze" },
      ],
    },
    {
      heading: "Flowcharty jako definicja systemu",
      paragraphs: [
        "Diagramy definiowały zachowanie systemu, a nie tylko mapowały ekrany — pokazywały zależności między akcjami użytkownika, stanami banerów i konsekwencjami produktowymi.",
        "Diagramy uwzględniały warunki, ograniczenia i wyjątki, pomagając developerom zrozumieć, co jest dozwolone, a co zablokowane w danym kontekście.",
      ],
      images: [{ ...IMAGES.flow1, alt: "Diagram przepływu interakcji z rozgałęzieniami warunkowymi i ograniczeniami" }],
    },
    {
      heading: "Zapobieganie błędom i bezpieczeństwo operacyjne",
      paragraphs: [
        "Interfejs priorytetowo traktował redukcję błędów: dodatkowe potwierdzenie dla krytycznych akcji, blokowanie usuwania aktywnych elementów i wyraźne odróżnienie dezaktywacji od kasowania.",
        "Walidacja formularza wykrywała nieprawidłowe dane (struktura URL, długość pola, format pliku) przed wprowadzeniem zmian na poziomie systemu — zapobiegając błędom, nie tylko je obsługując.",
      ],
      images: [{ ...IMAGES.errorPrev, alt: "Wzorce zapobiegania błędom: blokowanie destrukcyjnych akcji i walidacja inline" }],
    },
    {
      heading: "Warstwy interfejsu systemu",
      paragraphs: [
        "Interfejs składa się z połączonych warstw obsługujących różne etapy procesu zarządzania — zamiast jednego zunifikowanego widoku.",
      ],
    },
    {
      heading: "Lista banerów — przegląd systemu",
      paragraphs: [
        "Widok listy pełni funkcję panelu kontrolnego: wyświetla wszystkie banery, ich stany i kontekst użycia — umożliwiając podejmowanie świadomych decyzji operacyjnych.",
      ],
      images: [{ ...IMAGES.banerList, alt: "Widok listy banerów z kolumnami statusu, zakresu i kontekstu użycia" }],
    },
    {
      heading: "Formularz konfiguracyjny — definiowanie reguł",
      paragraphs: [
        "Formularz określa parametry działania banerów w ramach ograniczeń zdefiniowanych przez system — pełni funkcję interfejsu reguł, nie edytora treści.",
      ],
      images: [
        { ...IMAGES.form1, alt: "Formularz konfiguracji banera z walidacją pól i podpowiedziami ograniczeń" },
        { ...IMAGES.form2, alt: "Formularz w kontekście ogólnego widoku huba konfiguratora" },
      ],
    },
    {
      heading: "Podgląd — informacja zwrotna systemu",
      paragraphs: [
        "Warstwa podglądu dostarcza informacji zwrotnej: pokazuje, jak konfiguracja wpływa na rzeczywiste zachowanie UI w produkcie, redukując niepewność i niepożądane efekty.",
      ],
    },
    {
      heading: "Scenariusze — konsekwencje konfiguracji",
      paragraphs: [
        "Obsługa wariantów treści wymagała uwzględnienia wielu scenariuszy zachowania UI — pokazując konsekwencje decyzji konfiguracyjnych, a nie tylko wariacje wizualne.",
        "Scenariusze prezentowały różne zestawy aktywnych elementów i ich wpływ na layout — pozwalając przewidzieć reakcje systemu przed implementacją i służąc jako narzędzie komunikacji w zespole.",
      ],
      images: [{ ...IMAGES.scenarios, alt: "Macierz scenariuszy ilustrująca różne zestawy aktywnych elementów i ich wpływ na layout" }],
    },
    {
      heading: "Dokumentacja projektowa",
      paragraphs: [
        "Dokumentacja w Figmie obejmowała scenariusze, stany, zależności i edge cases — stanowiąc źródło prawdy dla dewelopmentu.",
        "Dokumentowała zachowanie i logikę systemu równolegle z layoutami — co jest kluczowe przy implementacji opartej na regułach, a nie tylko strukturze wizualnej.",
      ],
      images: [{ ...IMAGES.docs, alt: "Strona dokumentacji w Figmie obejmująca stany, zależności i edge cases" }],
    },
    {
      heading: "Wnioski",
      paragraphs: [
        "Narzędzia operacyjne wymagają projektowania reguł i ograniczeń — nie tylko ekranów.",
        "Największa wartość leżała w przełożeniu potrzeb biznesowych na modele systemowe — umożliwiając użytkownikom samodzielną pracę przy jednoczesnej ochronie jakości produktu.",
      ],
      bullets: [
        "UI działa jako warstwa kontrolna nad logiką systemu.",
        "Walidacja danych i reguły tworzą fundament rozwiązania.",
        "Ograniczenia systemowe umożliwiają poprawne działanie użytkownika.",
        "Praca z Design Systemem zwiększa spójność i przewidywalność.",
      ],
    },
  ],
};

export function getBanerCaseStudy(locale: Locale): CaseStudy {
  return locale === "pl" ? banerCaseStudyPl : banerCaseStudyEn;
}
