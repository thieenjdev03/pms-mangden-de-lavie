/**
 * Public marketing / future booking domain model.
 * Property → RoomType (category) → RoomUnit (physical key).
 */

export type PropertyKind = "villa" | "homestay";

export type PropertyContact = {
  phone: string;
  phoneDisplay: string;
  zaloUrl?: string;
  facebookUrl?: string;
  messengerUrl?: string;
  email?: string;
};

/** One villa or homestay branch (marketing + future ops). */
export type Property = {
  id: string;
  name: string;
  slug: string;
  type: PropertyKind;
  shortDescription: string;
  fullDescription: string;
  address: string;
  mapLabel: string;
  coverImage: string;
  gallery: string[];
  generalAmenities: string[];
  contact: PropertyContact;
  featuredTags: string[];
  /** Bullet highlights for cards / overview (curated; avoids repeating longDescription). */
  propertyHighlights: string[];
  checkInTime: string;
  checkOutTime: string;
  /**
   * Optional marketing floor price (VND/night). If set, used as property “giá từ” before
   * computing from room inventory.
   */
  marketingPriceFrom?: number;
};

export type RoomCapacity = {
  adults: number;
  children?: number;
};

/** Category of room (shared copy, gallery, pricing template). */
export type RoomType = {
  id: string;
  propertyId: string;
  name: string;
  slug: string;
  description: string;
  capacity: RoomCapacity;
  bedInfo: string;
  areaSqm: number;
  images: string[];
  amenities: string[];
  basePrice: number;
  weekendPrice?: number;
  holidayPrice?: number;
  /** @deprecated Prefer featuredBadge */
  featured?: boolean;
  /** Short label on card, e.g. "View đẹp nhất khu" */
  featuredBadge?: string;
};

export type RoomUnitStatus = "available" | "occupied" | "maintenance";

/** Physical bookable unit (inventory). Future booking engine targets this. */
export type RoomUnit = {
  id: string;
  propertyId: string;
  roomTypeId: string;
  roomCode: string;
  floor?: string;
  status: RoomUnitStatus;
  customPrice?: number;
  note?: string;
};

/** Room type + computed fields for cards and summaries. */
export type RoomTypeWithStats = RoomType & {
  priceFrom: number;
  availableRoomCount: number;
  roomCodes: string[];
};

/** Property card / homepage row. */
export type PropertyForHome = Property & {
  priceFrom: number;
  roomTypeCount: number;
  /** All room types belonging to this villa/homestay (for per-property UI). */
  roomTypesAtProperty: RoomTypeWithStats[];
};

/** Property detail page bundle (avoids prop drilling). */
export type PropertyDetailPayload = {
  property: Property;
  priceFrom: number;
  /** For detail page chips: propertyHighlights first, then fill from tags if needed. */
  propertyHighlights: string[];
  roomTypes: RoomTypeWithStats[];
};
