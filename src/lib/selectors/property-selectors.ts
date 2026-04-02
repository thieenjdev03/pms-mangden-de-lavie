import { properties, roomUnits } from "@/data/mock";
import { getDisplayPrice } from "@/lib/utils/get-room-price";
import {
  enrichRoomType,
  getRoomTypesByProperty,
  getRoomTypesWithStatsForProperty,
} from "@/lib/selectors/room-selectors";
import type { Property, PropertyDetailPayload, PropertyForHome } from "@/types/accommodation";

const HIGHLIGHT_FALLBACK_LIMIT = 4;

/** When property.propertyHighlights is empty, derive short bullets from tags + amenities. */
function fallbackHighlights(p: Property): string[] {
  const fromTags = p.featuredTags.slice(0, HIGHLIGHT_FALLBACK_LIMIT);
  if (fromTags.length >= HIGHLIGHT_FALLBACK_LIMIT) return fromTags;
  const extra = p.generalAmenities.filter((a) => !fromTags.includes(a));
  return [...fromTags, ...extra].slice(0, HIGHLIGHT_FALLBACK_LIMIT);
}

export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}

export function getPropertyPriceFrom(propertyId: string): number {
  const prop = properties.find((p) => p.id === propertyId);
  if (prop?.marketingPriceFrom != null) return prop.marketingPriceFrom;

  const types = getRoomTypesByProperty(propertyId);
  if (types.length === 0) return 0;
  const prices = types.map((rt) => getDisplayPrice(rt, roomUnits));
  return Math.min(...prices);
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getPropertiesForHomepage(): PropertyForHome[] {
  return properties.map((p) => {
    const stats = getRoomTypesWithStatsForProperty(p.id);
    const priceFrom = getPropertyPriceFrom(p.id);

    return {
      ...p,
      priceFrom,
      roomTypeCount: stats.length,
      roomTypesAtProperty: stats,
    };
  });
}

export function getDetailHighlights(property: Property): string[] {
  if (property.propertyHighlights.length > 0) return property.propertyHighlights;
  return fallbackHighlights(property);
}

export function getPropertyDetailPayload(slug: string): PropertyDetailPayload | null {
  const property = getPropertyBySlug(slug);
  if (!property) return null;
  const roomTypesStats = getRoomTypesByProperty(property.id).map((rt) => enrichRoomType(rt, roomUnits));
  return {
    property,
    priceFrom: getPropertyPriceFrom(property.id),
    propertyHighlights: getDetailHighlights(property),
    roomTypes: roomTypesStats,
  };
}

/** Static params for `generateStaticParams`. */
export function getAllPropertySlugs(): string[] {
  return properties.map((p) => p.slug);
}
