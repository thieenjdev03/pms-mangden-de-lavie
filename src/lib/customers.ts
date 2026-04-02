/** Customer management — types and seed data (client-side demo). */

export type CustomerStatus = "vip" | "normal" | "new";

export type CustomerRow = {
  key: string;
  customerId: string;
  name: string;
  phone: string;
  email: string;
  bookingCount: number;
  totalSpend: number;
  status: CustomerStatus;
  notes?: string;
  avatarColor: string;
};

export const customerStatusLabel: Record<CustomerStatus, string> = {
  vip: "VIP",
  normal: "Bình thường",
  new: "Mới",
};

export const INITIAL_CUSTOMERS: CustomerRow[] = [
  {
    key: "1",
    customerId: "KH-001",
    name: "Nguyễn Văn An",
    phone: "0901 234 567",
    email: "an.nguyen@email.com",
    bookingCount: 12,
    totalSpend: 45_800_000,
    status: "vip",
    avatarColor: "#1677FF",
  },
  {
    key: "2",
    customerId: "KH-002",
    name: "Trần Thị Bình",
    phone: "0912 345 678",
    email: "binh.tran@email.com",
    bookingCount: 5,
    totalSpend: 18_200_000,
    status: "normal",
    avatarColor: "#5B76B2",
  },
  {
    key: "3",
    customerId: "KH-003",
    name: "Lê Minh Châu",
    phone: "0933 456 789",
    email: "chau.le@gmail.com",
    bookingCount: 1,
    totalSpend: 3_500_000,
    status: "new",
    avatarColor: "#D45500",
  },
  {
    key: "4",
    customerId: "KH-004",
    name: "Phạm Quốc Đức",
    phone: "0944 567 890",
    email: "duc.pham@email.com",
    bookingCount: 8,
    totalSpend: 29_900_000,
    status: "vip",
    avatarColor: "#52C41A",
  },
  {
    key: "5",
    customerId: "KH-005",
    name: "Hoàng Thu Hà",
    phone: "0955 678 901",
    email: "ha.hoang@email.com",
    bookingCount: 3,
    totalSpend: 9_600_000,
    status: "normal",
    avatarColor: "#722ED1",
  },
  {
    key: "6",
    customerId: "KH-006",
    name: "Võ Đức Kiên",
    phone: "0966 789 012",
    email: "kien.vo@email.com",
    bookingCount: 0,
    totalSpend: 0,
    status: "new",
    avatarColor: "#13C2C2",
  },
  {
    key: "7",
    customerId: "KH-007",
    name: "Đặng Lan Anh",
    phone: "0977 890 123",
    email: "anh.dang@email.com",
    bookingCount: 15,
    totalSpend: 62_100_000,
    status: "vip",
    avatarColor: "#EB2F96",
  },
  {
    key: "8",
    customerId: "KH-008",
    name: "Bùi Văn Hải",
    phone: "0988 901 234",
    email: "hai.bui@email.com",
    bookingCount: 2,
    totalSpend: 6_800_000,
    status: "normal",
    avatarColor: "#FA8C16",
  },
];
