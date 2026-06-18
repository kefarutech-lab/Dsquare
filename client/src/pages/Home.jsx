import Hero         from "../components/Hero";
import About        from "../components/About";
import Services     from "../components/Services";
import Portfolio    from "../components/Portfolio";
import BeforeAfter  from "../components/BeforeAfter";
import Testimonials from "../components/Testimonials";
import Brands       from "../components/Brands";
import SEO, { LOCAL_BUSINESS_SCHEMA } from "../components/SEO";

export default function Home() {
  return (
    <main>
      <SEO
        title="Premium Interior Design Studio, Pune"
        description="DSquare Designs is a premium interior design studio in Pune specialising in residential, commercial and hospitality interiors. Transform your space today."
        keywords="interior designer Pune, interior design studio Pune, residential interior design Pune, luxury home interiors Pune, commercial interior design Pune, home interior design Pune"
        canonical="/"
        schema={LOCAL_BUSINESS_SCHEMA}
      />
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
