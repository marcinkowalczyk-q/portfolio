import type { Metadata } from "next";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import AboutContent from "@/components/about/about-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Marcin Kowalczyk — UX/UI designer focused on complex systems, ambiguous problems, and AI-assisted product design.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}
