import { renderMonogram } from "@/lib/og-image";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return renderMonogram(32, { rounded: true });
}
