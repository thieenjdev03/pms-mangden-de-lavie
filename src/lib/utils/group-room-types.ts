import type { RoomUnit } from "@/types/accommodation";

/** Group physical units by room type — useful for admin / future availability APIs. */
export function groupRoomUnitsByRoomType(units: RoomUnit[]): Map<string, RoomUnit[]> {
  const map = new Map<string, RoomUnit[]>();
  for (const u of units) {
    const list = map.get(u.roomTypeId) ?? [];
    list.push(u);
    map.set(u.roomTypeId, list);
  }
  return map;
}
