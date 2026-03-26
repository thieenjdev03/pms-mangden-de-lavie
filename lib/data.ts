/** Fake in-memory store for quick demo (no database). */

export type Room = {
  id: string;
  name: string;
  property: string;
};

export const rooms: Room[] = [
  { id: "r1", name: "V1-101", property: "Villa 1" },
  { id: "r2", name: "V1-102", property: "Villa 1" },
  { id: "r3", name: "H1-01", property: "Homestay 1" },
  { id: "r4", name: "V2-201", property: "Villa 2" },
  { id: "r5", name: "V2-202", property: "Villa 2" },
];

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

export const propertyOptions = ["Villa 1", "Villa 2", "Homestay 1"] as const;

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
