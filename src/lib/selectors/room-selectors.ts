import { roomTypes, roomUnits } from "@/data/mock";
import { getDisplayPrice } from "@/lib/utils/get-room-price";
import type { RoomType, RoomTypeWithStats, RoomUnit } from "@/types/accommodation";

export function getRoomTypesByProperty(propertyId: string): RoomType[] {
  return roomTypes.filter((r) => r.propertyId === propertyId);
}

export function getRoomUnitsByRoomType(roomTypeId: string): RoomUnit[] {
  return roomUnits.filter((u) => u.roomTypeId === roomTypeId);
}

export function getRoomUnitsByProperty(propertyId: string): RoomUnit[] {
  return roomUnits.filter((u) => u.propertyId === propertyId);
}

export function getAvailableRoomCount(roomTypeId: string): number {
  return roomUnits.filter((u) => u.roomTypeId === roomTypeId && u.status === "available").length;
}

export function getRoomCodesByRoomType(roomTypeId: string): string[] {
  return roomUnits
    .filter((u) => u.roomTypeId === roomTypeId)
    .map((u) => u.roomCode)
    .sort();
}

export function enrichRoomType(rt: RoomType, units: RoomUnit[]): RoomTypeWithStats {
  return {
    ...rt,
    priceFrom: getDisplayPrice(rt, units),
    availableRoomCount: getAvailableRoomCount(rt.id),
    roomCodes: getRoomCodesByRoomType(rt.id),
  };
}

export function getRoomTypesWithStatsForProperty(propertyId: string): RoomTypeWithStats[] {
  const types = getRoomTypesByProperty(propertyId);
  return types.map((rt) => enrichRoomType(rt, roomUnits));
}
