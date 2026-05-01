import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import Hero from "@/components/hero/hero";
import WorkList from "@/components/work/work-list";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <WorkList />
      </main>
      <Footer />
    </>
  );
}
