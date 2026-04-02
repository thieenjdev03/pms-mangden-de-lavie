import dayjs from "dayjs";
import type { Booking, Room, Villa } from "@/lib/data";

/** Villa id — used in calendar "Khu vực" filter. */
export type CalendarProperty = string;

/** Build Ant Design Select options from current villas. */
export function buildCalendarAreaOptions(villas: Villa[]): { value: string; label: string }[] {
  return villas.map((v) => ({ value: v.id, label: v.name }));
}

/** Trạng thái hiển thị trên lịch (filter bar). */
export type CalendarOccupancyFilter = "all" | "occupied" | "vacant";

/** FullCalendar view types exposed in toolbar. */
export type CalendarViewMode = "dayGridMonth" | "timeGridWeek" | "timeGridDay";

export const CALENDAR_VIEW_OPTIONS: { value: CalendarViewMode; label: string }[] = [
  { value: "dayGridMonth", label: "Tháng" },
  { value: "timeGridWeek", label: "Tuần" },
  { value: "timeGridDay", label: "Ngày" },
];

export function getRoomsForProperty(villaId: string, roomList: Room[]): Room[] {
  return roomList.filter((r) => r.villaId === villaId);
}

export function getRoomsForProperties<T extends Room>(
  villaIds: CalendarProperty[],
  roomList: T[],
): T[] {
  const set = new Set(villaIds);
  return roomList.filter((r) => set.has(r.villaId));
}

export function filterBookingsForRooms(bookings: Booking[], roomList: Room[]): Booking[] {
  const ids = new Set(roomList.map((r) => r.id));
  return bookings.filter((b) => ids.has(b.roomId));
}

/**
 * - all: mọi booking chưa hủy
 * - occupied: đang lưu trú (khoảng ngày chứa hôm nay)
 * - vacant: ẩn mọi sự kiện để xem ô trống và chọn ngày đặt mới
 */
export function filterBookingsByOccupancy(
  bookings: Booking[],
  filter: CalendarOccupancyFilter,
  today = dayjs().format("YYYY-MM-DD"),
): Booking[] {
  const active = bookings.filter((b) => b.status !== "cancelled");
  if (filter === "all") return active;
  if (filter === "occupied") {
    return active.filter((b) => b.checkin <= today && b.checkout > today);
  }
  return [];
}
