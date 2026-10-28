import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

// Intrinsic size of an image in public/, so content doesn't need width / height. Server only.
export function getImageSize(src: string): { width: number; height: number } {
  const file = path.join(process.cwd(), "public", src);
  if (!fs.existsSync(file)) throw new Error(`Image not found: public${src}`);
  const { width, height } = imageSize(fs.readFileSync(file));
  return { width, height };
}
