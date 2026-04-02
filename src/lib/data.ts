/** Fake in-memory store for quick demo (no database). */

export type Villa = {
  id: string;
  name: string;
  /** Optional short label in calendar legend (falls back to name). */
  shortLabel?: string;
};

export const villas: Villa[] = [
  { id: "v1", name: "Villa 1", shortLabel: "Ocean A" },
  { id: "v2", name: "Villa 2", shortLabel: "Hillside B" },
  { id: "v3", name: "Homestay 1", shortLabel: "Homestay C" },
];

/** Room category within one villa (admin / PMS). */
export type RoomType = {
  id: string;
  villaId: string;
  name: string;
};

export const roomTypes: RoomType[] = [
  { id: "rt-v1-def", villaId: "v1", name: "Phòng tiêu chuẩn" },
  { id: "rt-v2-def", villaId: "v2", name: "Phòng tiêu chuẩn" },
  { id: "rt-v3-def", villaId: "v3", name: "Phòng tiêu chuẩn" },
];

export type RoomUnitStatus = "available" | "occupied" | "maintenance";

/** Physical bookable unit; booking.roomId points here. roomCode unique per villaId. */
export type RoomUnit = {
  id: string;
  villaId: string;
  roomTypeId: string;
  roomCode: string;
  floor?: string;
  status?: RoomUnitStatus;
  displayName?: string;
};

/** @deprecated Use RoomUnit — alias for existing PMS imports. */
export type Room = RoomUnit;

export const rooms: RoomUnit[] = [
  {
    id: "r1",
    villaId: "v1",
    roomTypeId: "rt-v1-def",
    roomCode: "V1-101",
    status: "available",
  },
  {
    id: "r2",
    villaId: "v1",
    roomTypeId: "rt-v1-def",
    roomCode: "V1-102",
    status: "available",
  },
  {
    id: "r3",
    villaId: "v3",
    roomTypeId: "rt-v3-def",
    roomCode: "H1-01",
    status: "available",
  },
  {
    id: "r4",
    villaId: "v2",
    roomTypeId: "rt-v2-def",
    roomCode: "V2-201",
    status: "available",
  },
  {
    id: "r5",
    villaId: "v2",
    roomTypeId: "rt-v2-def",
    roomCode: "V2-202",
    status: "available",
  },
];

/** Enriched row from GET /api/rooms for selects and tables. */
export type RoomUnitWithDetails = RoomUnit & {
  villaName: string;
  roomTypeName: string;
  /** Single line for Ant Design Select / calendar title. */
  label: string;
};

/** @deprecated Use RoomUnitWithDetails */
export type RoomWithVillaName = RoomUnitWithDetails;

export function getVillaById(id: string): Villa | undefined {
  return villas.find((v) => v.id === id);
}

export function getRoomTypeById(id: string): RoomType | undefined {
  return roomTypes.find((t) => t.id === id);
}

export function getRoomTypesByVillaId(villaId: string): RoomType[] {
  return roomTypes.filter((t) => t.villaId === villaId);
}

export function getRoomUnitById(id: string): RoomUnit | undefined {
  return rooms.find((r) => r.id === id);
}

/** True if another unit in the same villa already has this roomCode (optionally excluding unit id). */
export function isRoomCodeTakenInVilla(
  villaId: string,
  roomCode: string,
  excludeUnitId?: string,
): boolean {
  const code = roomCode.trim();
  if (!code) return true;
  return rooms.some(
    (r) =>
      r.villaId === villaId &&
      r.roomCode.trim().toLowerCase() === code.toLowerCase() &&
      r.id !== excludeUnitId,
  );
}

export function buildRoomUnitLabel(unit: RoomUnit, villaName: string, roomTypeName: string): string {
  if (unit.displayName?.trim()) {
    return `${villaName} — ${unit.displayName.trim()}`;
  }
  return `${villaName} — ${roomTypeName} · ${unit.roomCode}`;
}

export function enrichRoomUnit(unit: RoomUnit): RoomUnitWithDetails {
  const villa = getVillaById(unit.villaId);
  const rt = getRoomTypeById(unit.roomTypeId);
  const villaName = villa?.name ?? unit.villaId;
  const roomTypeName = rt?.name ?? unit.roomTypeId;
  const label = buildRoomUnitLabel(unit, villaName, roomTypeName);
  return {
    ...unit,
    villaName,
    roomTypeName,
    label,
  };
}

/** Display name for legacy helpers. */
export function getVillaNameForRoom(room: RoomUnit): string {
  return getVillaById(room.villaId)?.name ?? room.villaId;
}

export type BookingStatus = "confirmed" | "pending" | "cancelled";

export type Booking = {
  id: string;
  roomId: string;
  guest: string;
  phone: string;
  checkin: string;
  checkout: string;
  total: number;
  deposit?: number;
  status: BookingStatus;
};

/** Payload from the booking form (before server assigns id / status). */
export type CreateBookingPayload = {
  roomId: string;
  guest: string;
  phone: string;
  checkin: string;
  checkout: string;
  total: number;
  deposit?: number;
};

/** Bookings via POST /api/bookings. Dates as ISO YYYY-MM-DD. */
export const bookings: Booking[] = [
  {
    id: "b1",
    roomId: "r1",
    guest: "Nguyen Van A",
    phone: "0901234567",
    checkin: new Date().toISOString().slice(0, 10),
    checkout: new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10),
    total: 2_400_000,
    deposit: 500_000,
    status: "confirmed",
  },
  {
    id: "b2",
    roomId: "r2",
    guest: "Tran Thi B",
    phone: "0912345678",
    checkin: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    checkout: new Date(Date.now() + 4 * 86400000).toISOString().slice(0, 10),
    total: 1_800_000,
    status: "pending",
  },
  {
    id: "b3",
    roomId: "r4",
    guest: "Le Van C",
    phone: "0923456789",
    checkin: new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10),
    checkout: new Date(Date.now() + 5 * 86400000).toISOString().slice(0, 10),
    total: 3_200_000,
    deposit: 960_000,
    status: "confirmed",
  },
];

export type Expense = {
  id: string;
  date: string;
  property: string;
  type: string;
  amount: number;
};

export const expenseTypeOptions = [
  "Utilities",
  "Supplies",
  "Maintenance",
  "Other",
] as const;

export const expenses: Expense[] = [
  {
    id: "e1",
    date: new Date().toISOString().slice(0, 10),
    property: "Villa 1",
    type: "Utilities",
    amount: 450_000,
  },
];
