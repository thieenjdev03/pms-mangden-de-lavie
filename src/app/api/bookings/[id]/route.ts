import type { Booking } from "@/lib/data";
import { bookings } from "@/lib/data";

type RouteContext = { params: Promise<{ id: string }> };

/** Partial update (e.g. drag/resize: checkin, checkout). */
export async function PATCH(req: Request, context: RouteContext) {
  const { id } = await context.params;
  const body = await req.json();
  const idx = bookings.findIndex((b) => b.id === id);
  if (idx === -1) {
    return Response.json({ error: "not found" }, { status: 404 });
  }
  const prev = bookings[idx];
  const next: Booking = {
    ...prev,
    checkin: body.checkin != null ? String(body.checkin) : prev.checkin,
    checkout: body.checkout != null ? String(body.checkout) : prev.checkout,
    roomId: body.roomId != null ? String(body.roomId) : prev.roomId,
  };
  bookings[idx] = next;
  return Response.json({ success: true, booking: next });
}
