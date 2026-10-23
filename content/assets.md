# Assets

Images and illustrations in the Figma page `Porfolio` (file `CGhui9MPfrGTTYfZwj7Ukx`), with node IDs for export.
EN and PL frames use the same images, so each row is one file with four placements.

- **Planned path** is the path the MDX files already point to. Nothing in it is exported yet. The only files in `public/images/` today are `configurator.png` and `edor.png`.
- To export a node: in Figma, select the node ID and use Export, or call `get_screenshot` / `download_assets` on that node.
- A "crop" note means Figma shows only part of the image (the fill is scaled past the frame). Export the frame, not the raw fill, to get the visible crop.

## Homepage

| Asset | Planned path | EN desktop | EN mobile | PL desktop | PL mobile | Notes |
|---|---|---|---|---|---|---|
| Hero background (faint wireframe illustration) | `/images/home/hero-bg.png` | `2004:133` | `2004:153` | `2004:2190` | — | Image fill on the Hero frame itself. **Missing from PL mobile** (`2004:2210`). |
| Project card 01: configurator monitor mockup | `/images/configurator.png` ✅ exists | `I2014:454;11:14` | `I2004:162;26:41` | `2014:557` | `I2004:2219;26:41` | 672×420, radius 6 |
| Project card 02: e-Delivery laptop + phone mockup | `/images/edor.png` ✅ exists | `I2014:455;22:50` | `I2004:163;26:41` | `2014:566` | `I2004:2220;26:41` | 672×420; `object-contain` on mobile |

## About

| Asset | Planned path | EN desktop | EN mobile | PL desktop | PL mobile | Notes |
|---|---|---|---|---|---|---|
| Portrait | `/images/about/portrait.png` | `2004:1289` | `2004:1319` | `2004:2863` | `2004:2893` | 315×315 image centred in a 380×475 frame (`2004:1288`) |
| LinkedIn icon (SVG) | icon, inline SVG | `2004:1299` | `2004:1315` | `2004:2873` | `2004:2889` | 20×20 |

## Case study: Dynamic Content Configurator (`banner-configurator`)

| Asset | Planned path | EN desktop | EN mobile | PL desktop | PL mobile | Notes |
|---|---|---|---|---|---|---|
| Header mockup | `/images/banner-configurator/hero.png` | `2004:606` | `2004:759` | `2004:2236` | `2004:2389` | 889×556, overflows header to the right/bottom |
| From tasks to system logic: diagram | `/images/banner-configurator/system-logic.png` | `2004:673` | `2004:831` | `2004:2303` | `2004:2461` | 790×453 (ratio 1658/950) |
| Design System 1 | `/images/banner-configurator/design-system-1.png` | `2004:682` | `2004:840` | `2004:2312` | `2004:2470` | ratio 1539/967; side by side on desktop |
| Design System 2 | `/images/banner-configurator/design-system-2.png` | `2004:683` | `2004:841` | `2004:2313` | `2004:2471` | ratio 1539/1009 |
| Interaction flows | `/images/banner-configurator/interaction-flows.png` | `2004:691` | `2004:849` | `2004:2321` | `2004:2479` | 790×469 (ratio 1080/642) |
| Error prevention | `/images/banner-configurator/error-prevention.png` | `2004:699` | `2004:857` | `2004:2329` | `2004:2487` | ratio 1380/820 |
| Banner list | `/images/banner-configurator/banner-list.png` | `2004:707` | `2004:869` | `2004:2337` | `2004:2499` | 500×312, text on the right on desktop |
| Configuration form | `/images/banner-configurator/configuration-form.png` | `2004:713` | `2004:875` | `2004:2343` | `2004:2505` | **crop**: fill is 142.9% height, top-aligned |
| Preview | `/images/banner-configurator/preview.png` | `2004:719` | `2004:881` | `2004:2349` | `2004:2511` | ratio 1440/996 |
| Scenarios | `/images/banner-configurator/scenarios.png` | `2004:731` | `2004:889` | `2004:2361` | `2004:2519` | 790×485 (ratio 1080/663) |
| Design documentation | `/images/banner-configurator/documentation.png` | `2004:739` | `2004:897` | `2004:2369` | `2004:2527` | ratio 1080/642 |

## Case study: e-Delivery / e-Doręczenia (`e-doreczenia`)

| Asset | Planned path | EN desktop | EN mobile | PL desktop | PL mobile | Notes |
|---|---|---|---|---|---|---|
| Header device mockup ("Card/edor") | `/images/e-doreczenia/hero.png` | `2004:948` | `2070:462` | `2004:2549` | `2068:284` | 970×606, `object-contain`, overflows header |
| Dependency diagram ("schemat_zaleznosci") | `/images/e-doreczenia/dependency-diagram.png` | `2004:1027` | `2070:535` | `2004:2628` | `2068:243` | ratio 3604/867, on `#f6f8fa` panel. PL mobile repeats it in the Dashboard section (`2070:627`). Probably a leftover, see inventory. |
| mObywatel reference screenshot | `/images/e-doreczenia/mobywatel-reference.png` | `2004:1038` | `2070:546` | `2004:2639` | `2068:255` | **crop**: fill is 142.11% width, left-aligned |
| e-Delivery inbox screenshot | `/images/e-doreczenia/inbox.png` | `2004:1041` | `2070:549` | `2004:2642` | `2068:259` | **crop**: fill 106.98% height, top-aligned |
| Dashboard (desktop screenshot) | `/images/e-doreczenia/dashboard-desktop.png` | `2004:1049` | `2070:633` | `2004:2650` | `2070:629` | 644×405; overlaid by the phone mockup below |
| Dashboard (phone mockup) | `/images/e-doreczenia/dashboard-mobile.png` | `2004:1050` | `2070:634` | `2004:2651` | `2070:630` | 299×373, overlaps the desktop shot. The layer is named "ChatGPT Image May 4, 2026"; check that it's the final asset. |
| Permissions: folder configuration | `/images/e-doreczenia/permissions-folder.png` | `2004:1059` | `2070:613` | `2004:2660` | `2068:262` | 790×637, has caption |
| User details | `/images/e-doreczenia/user-details.png` | `2004:1067` | `2070:566` | `2004:2668` | `2068:265` | 790×497 |
| Notification settings | `/images/e-doreczenia/notification-settings.png` | `2004:1074` | `2070:573` | `2004:2675` | `2068:274` | 790×498 |
| System layers 1 (02.20.33) | `/images/e-doreczenia/layers-1.png` | `2004:1084` | `2070:584` | `2004:2685` | `2068:278` | 2×2 grid on desktop |
| System layers 2 (02.20.11) | `/images/e-doreczenia/layers-2.png` | `2004:1085` | `2070:585` | `2004:2686` | `2068:279` | |
| System layers 3 (02.21.23) | `/images/e-doreczenia/layers-3.png` | `2004:1087` | `2070:587` | `2004:2688` | `2068:281` | |
| System layers 4 (02.19.58) | `/images/e-doreczenia/layers-4.png` | `2004:1088` | `2070:588` | `2004:2689` | `2068:282` | |
| Extra "Scenarios Image" (mobile only) | not mapped | — | `2070:581` | — | `2004:2839` | Only in the mobile System layers section. The layer name matches the Banner case study and the image looks misplaced, so it isn't in the MDX. |
| Scope bullet marker (SVG) | decorative, use CSS | `2004:965` (+`969`, `973`) | — (list bullets) | `2004:2566` (+`2570`, `2574`) | — | 6×17 |
