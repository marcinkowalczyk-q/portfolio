import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

// Shared 1200×630 share card for every route's opengraph-image.tsx. Server only.
// Satori can't read CSS variables, so colours are the hex values of the globals.css tokens.
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const color = {
  surface: "#fafbfd", // --color-surface
  fg: "#151515", // --color-fg
  fgPrimary: "#202226", // --color-fg-primary
  fgSecondary: "#4b5160", // --color-fg-secondary
  fgTertiary: "#60687a", // --color-fg-tertiary
  border: "#dbdbdb", // --color-border
};

// Background behind each project image, matching the case study header
export const projectBg = {
  "banner-configurator": "#e2e8ed", // --color-project-configurator
  "e-doreczenia": "#f2f9ff", // --color-project-edelivery
} as const;

const fontDir = path.join(process.cwd(), "node_modules", "@fontsource");
const font = (pkg: string, file: string) => readFile(path.join(fontDir, pkg, "files", file));

// Latin + latin-ext under one name, so Polish characters render
async function loadFonts() {
  const [bitter, bitterExt, inter, interExt, interMedium, interMediumExt] = await Promise.all([
    font("bitter", "bitter-latin-600-normal.woff"),
    font("bitter", "bitter-latin-ext-600-normal.woff"),
    font("inter", "inter-latin-400-normal.woff"),
    font("inter", "inter-latin-ext-400-normal.woff"),
    font("inter", "inter-latin-500-normal.woff"),
    font("inter", "inter-latin-ext-500-normal.woff"),
  ]);
  return [
    { name: "Bitter", data: bitter, weight: 600 as const },
    { name: "Bitter", data: bitterExt, weight: 600 as const },
    { name: "Inter", data: inter, weight: 400 as const },
    { name: "Inter", data: interExt, weight: 400 as const },
    { name: "Inter", data: interMedium, weight: 500 as const },
    { name: "Inter", data: interMediumExt, weight: 500 as const },
  ];
}

async function dataUrl(publicSrc: string) {
  const buf = await readFile(path.join(process.cwd(), "public", publicSrc));
  return `data:image/png;base64,${buf.toString("base64")}`;
}

type Options = {
  eyebrow: string;
  // Each item is its own line
  title: string | string[];
  // Case studies: project thumbnail from public/ on its project colour
  image?: { src: string; bg: string };
};

export async function renderOgImage({ eyebrow, title, image }: Options) {
  const [fonts, imageSrc] = await Promise.all([loadFonts(), image ? dataUrl(image.src) : null]);

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: color.surface, fontFamily: "Inter" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            padding: "72px 64px 64px 72px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 22,
                fontWeight: 500,
                letterSpacing: 2.5,
                textTransform: "uppercase",
                color: color.fgTertiary,
              }}
            >
              {eyebrow}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 24,
                fontFamily: "Bitter",
                fontWeight: 600,
                fontSize: image ? 60 : 72,
                lineHeight: 1.15,
                letterSpacing: -1,
                color: color.fg,
              }}
            >
              {[title].flat().map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              paddingTop: 28,
              borderTop: `1px solid ${color.border}`,
            }}
          >
            <div style={{ fontFamily: "Bitter", fontWeight: 600, fontSize: 28, color: color.fgPrimary, whiteSpace: "nowrap" }}>
              Marcin Kowalczyk
            </div>
            <div style={{ fontSize: 22, color: color.fgSecondary, whiteSpace: "nowrap" }}>{siteConfig.role}</div>
          </div>
        </div>
        {image && imageSrc && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 560,
              height: "100%",
              background: image.bg,
            }}
          >
            {/* Card images are 672×420 with their own padding, so they can run edge to edge.
                Satori renders plain <img> only, so next/image doesn't apply here. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageSrc} alt="" width={560} height={350} />
          </div>
        )}
      </div>
    ),
    { ...ogSize, fonts }
  );
}

// "MK" monogram for icon.tsx / apple-icon.tsx (iOS rounds the corners itself)
export async function renderMonogram(px: number, { rounded }: { rounded: boolean }) {
  const bitter = await font("bitter", "bitter-latin-600-normal.woff");
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: color.fg,
          borderRadius: rounded ? px * 0.2 : 0,
          color: "#ffffff",
          fontFamily: "Bitter",
          fontWeight: 600,
          fontSize: px * 0.46,
          letterSpacing: px * -0.01,
        }}
      >
        MK
      </div>
    ),
    { width: px, height: px, fonts: [{ name: "Bitter", data: bitter, weight: 600 }] }
  );
}
