import { Hero } from "../components/Hero";
import { Categories } from "../components/Categories";
import { Products } from "../components/Products";
import { WhyGeekZone } from "../components/WhyGeekZone";
import { PromoBanner } from "../components/PromoBanner";
import { Testimonials } from "../components/Testimonials";
import { Newsletter } from "../components/Newsletter";

export function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Products />
      <PromoBanner />
      <WhyGeekZone />
      <Testimonials />
      <Newsletter />
    </>
  );
}
