import Hero         from "../components/Hero";
import About        from "../components/About";
import Services     from "../components/Services";
import Portfolio    from "../components/Portfolio";
import BeforeAfter  from "../components/BeforeAfter";
import Testimonials from "../components/Testimonials";
import Brands       from "../components/Brands";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <BeforeAfter />
      <Testimonials />
      <Brands />
    </main>
  );
}
