import { SectionContainer } from "@/components/layout/section-container";
import { ImageGallery } from "@/components/shared/image-gallery";
import { SectionHeading } from "@/components/shared/section-heading";
import type { Property } from "@/types/accommodation";

type PropertyGalleryProps = {
  property: Property;
};

export function PropertyGallery({ property }: PropertyGalleryProps) {
  if (property.gallery.length === 0) return null;
  return (
    <SectionContainer py="sm" className="bg-heal-neutral-soft/50">
      <SectionHeading align="left" eyebrow="Hình ảnh" title="Không gian & góc chill" />
      <ImageGallery images={property.gallery} altBase={property.name} />
    </SectionContainer>
  );
}
