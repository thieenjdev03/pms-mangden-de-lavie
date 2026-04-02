import dayjs from "dayjs";
import type { Booking } from "@/lib/data";

/**
 * Returns true if the new range overlaps an existing booking for the same room.
 * Uses: newCheckin < existingCheckout && newCheckout > existingCheckin (date-based).
 * @param excludeBookingId — skip this booking (e.g. when moving/resizing the same event).
 */
export function hasRoomBookingConflict(
  roomId: string,
  newCheckin: string,
  newCheckout: string,
  existing: Pick<Booking, "id" | "roomId" | "checkin" | "checkout" | "status">[],
  excludeBookingId?: string,
): boolean {
  const ni = dayjs(newCheckin).startOf("day");
  const no = dayjs(newCheckout).startOf("day");
  return existing.some((b) => {
    if (excludeBookingId && b.id === excludeBookingId) return false;
    if (b.roomId !== roomId || b.status === "cancelled") return false;
    const ei = dayjs(b.checkin).startOf("day");
    const eo = dayjs(b.checkout).startOf("day");
    return ni.isBefore(eo) && no.isAfter(ei);
  });
}
