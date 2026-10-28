import type { ElementType, ReactNode } from "react";

const SIZES = {
  text: "max-w-text",
  figure: "max-w-figure",
  wide: "max-w-wide",
  content: "max-w-content",
  page: "max-w-page",
  cards: "max-w-cards",
} as const;

type Props = {
  size?: keyof typeof SIZES;
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

// box-content: the token is the content width; gutters (24 / 40px) sit outside it
export default function Container({ size = "page", as: Tag = "div", className = "", children }: Props) {
  return (
    <Tag className={`mx-auto box-content px-6 md:px-10 ${SIZES[size]} ${className}`}>{children}</Tag>
  );
}
