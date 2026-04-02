import type { RoomType, RoomUnit } from "@/types/accommodation";

/**
 * Lowest effective nightly price for a room type from available inventory.
 * Falls back to basePrice when no available units (marketing still shows floor).
 */
export function getDisplayPrice(roomType: RoomType, units: RoomUnit[]): number {
  const forType = units.filter((u) => u.roomTypeId === roomType.id && u.status === "available");
  if (forType.length === 0) return roomType.basePrice;
  const values = forType.map((u) => u.customPrice ?? roomType.basePrice);
  return Math.min(...values);
}
