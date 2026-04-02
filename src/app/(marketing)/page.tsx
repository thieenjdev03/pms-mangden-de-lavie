import { BrandStorySection } from "@/components/home/brand-story-section";
import { FinalCtaSection } from "@/components/home/final-cta-section";
import { HeroSection } from "@/components/home/hero-section";
import { PropertyListSection } from "@/components/home/property-list-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { WhyChooseUsSection } from "@/components/home/why-choose-us-section";
import { testimonials } from "@/data/mock";
import { getPropertiesForHomepage } from "@/lib/selectors/property-selectors";

export default function HomePage() {
  const properties = getPropertiesForHomepage();

  return (
    <>
      <HeroSection />
      <BrandStorySection />
      <PropertyListSection properties={properties} />
      <WhyChooseUsSection />
      <TestimonialsSection testimonials={testimonials} />
      <FinalCtaSection />
    </>
  );
}
