/** Hard-coded dashboard demo data (reference UI mock). */

export const MOCK_GREETING_SUB = {
  newCheckIns: 12,
  roomsNeedCleaning: 5,
} as const;

export const MOCK_KPIS = [
  {
    key: "revenue",
    title: "Doanh thu tháng",
    value: "420.000.000đ",
    hint: "+12.5%",
    iconBg: "#1677FF",
  },
  {
    key: "occupancy",
    title: "Tỷ lệ lấp đầy",
    value: "84.2%",
    hint: "Tốt",
    iconBg: "#5B76B2",
  },
  {
    key: "newBookings",
    title: "Booking mới",
    value: "24",
    hint: "Mới",
    iconBg: "#D45500",
  },
  {
    key: "guests",
    title: "Đang ở",
    value: "56 khách",
    hint: "Hiện tại",
    iconBg: "#F759AB",
  },
] as const;

/** Bar heights (px) for mock chart — last bar emphasized like reference. */
export const MOCK_REVENUE_BARS = [
  { label: "T2", height: 52, active: false },
  { label: "T3", height: 68, active: false },
  { label: "T4", height: 44, active: false },
  { label: "T5", height: 76, active: false },
  { label: "T6", height: 58, active: false },
  { label: "T7", height: 50, active: false },
  { label: "CN", height: 88, active: true },
] as const;

export type MockCleaningRow = {
  key: string;
  name: string;
  status: "cleaning" | "ready" | "waiting";
  statusLabel: string;
};

export const MOCK_CLEANING_ROWS: MockCleaningRow[] = [
  { key: "1", name: "Villa A101", status: "cleaning", statusLabel: "Đang dọn dẹp" },
  { key: "2", name: "Villa B205", status: "ready", statusLabel: "Đã sẵn sàng" },
  { key: "3", name: "Homestay C02", status: "waiting", statusLabel: "Chờ dọn dẹp" },
  { key: "4", name: "Villa A105", status: "ready", statusLabel: "Đã sẵn sàng" },
];

export type MockUpcomingBooking = {
  key: string;
  guest: string;
  email: string;
  avatarColor: string;
  arrival: string;
  room: string;
  guests: number;
  status: "deposited" | "paid" | "confirmed";
};

export const MOCK_UPCOMING_BOOKINGS: MockUpcomingBooking[] = [
  {
    key: "1",
    guest: "Nguyễn Lan",
    email: "lan.nguyen@email.com",
    avatarColor: "#1677FF",
    arrival: "14:00 Hôm nay, 2 đêm",
    room: "Villa Deluxe View Biển",
    guests: 4,
    status: "deposited",
  },
  {
    key: "2",
    guest: "Trần Minh",
    email: "minh.tran@email.com",
    avatarColor: "#D45500",
    arrival: "15:30 Hôm nay, 1 đêm",
    room: "Homestay Garden View",
    guests: 2,
    status: "paid",
  },
  {
    key: "3",
    guest: "Lê Hoa",
    email: "hoa.le@email.com",
    avatarColor: "#5B76B2",
    arrival: "12:00 Ngày mai, 3 đêm",
    room: "Penthouse Ocean View",
    guests: 6,
    status: "confirmed",
  },
];
