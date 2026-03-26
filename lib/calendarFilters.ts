import dayjs from "dayjs";
import type { Booking, Room } from "@/lib/data";
import { rooms } from "@/lib/data";

/** Properties available in the booking calendar (Chọn khu). */
export const CALENDAR_PROPERTIES = ["Villa 1", "Villa 2", "Homestay 1"] as const;

export type CalendarProperty = (typeof CALENDAR_PROPERTIES)[number];

/** UI labels for filter "Khu vực" (maps to rooms.property). */
export const CALENDAR_AREA_OPTIONS: { value: CalendarProperty; label: string }[] = [
  { value: "Villa 1", label: "Villa Ocean" },
  { value: "Villa 2", label: "Hillside" },
  { value: "Homestay 1", label: "Homestay" },
];

/** Trạng thái hiển thị trên lịch (filter bar). */
export type CalendarOccupancyFilter = "all" | "occupied" | "vacant";

/** FullCalendar view types exposed in toolbar. */
export type CalendarViewMode = "dayGridMonth" | "timeGridWeek" | "timeGridDay";

export const CALENDAR_VIEW_OPTIONS: { value: CalendarViewMode; label: string }[] = [
  { value: "dayGridMonth", label: "Tháng" },
  { value: "timeGridWeek", label: "Tuần" },
  { value: "timeGridDay", label: "Ngày" },
];

export function getRoomsForProperty(property: string): Room[] {
  return rooms.filter((r) => r.property === property);
}

export function getRoomsForProperties(propertyList: CalendarProperty[]): Room[] {
  const set = new Set(propertyList);
  return rooms.filter((r) => set.has(r.property as CalendarProperty));
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
