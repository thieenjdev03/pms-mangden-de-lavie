import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PropertyAmenities } from "@/components/property/property-amenities";
import { PropertyContactCta } from "@/components/property/property-contact-cta";
import { PropertyGallery } from "@/components/property/property-gallery";
import { PropertyHero } from "@/components/property/property-hero";
import { PropertyOverview } from "@/components/property/property-overview";
import { PropertyPricingSummary } from "@/components/property/property-pricing-summary";
import { RoomTypeList } from "@/components/property/room-type-list";
import {
  getAllPropertySlugs,
  getPropertyBySlug,
  getPropertyDetailPayload,
} from "@/lib/selectors/property-selectors";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPropertySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const p = getPropertyBySlug(slug);
  if (!p) return { title: "Không tìm thấy" };
  return {
    title: `${p.name} — Măng Đen De Lavie`,
    description: p.shortDescription,
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const data = getPropertyDetailPayload(slug);
  if (!data) notFound();

  return (
    <article>
      <PropertyHero property={data.property} priceFrom={data.priceFrom} />
      <PropertyOverview property={data.property} highlights={data.propertyHighlights} />
      <PropertyGallery property={data.property} />
      <PropertyAmenities items={data.property.generalAmenities} propertyName={data.property.name} />
      <RoomTypeList property={data.property} roomTypes={data.roomTypes} />
      <PropertyPricingSummary roomTypes={data.roomTypes} />
      <PropertyContactCta property={data.property} />
    </article>
  );
}
