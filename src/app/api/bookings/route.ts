import type { Booking, BookingStatus } from "@/lib/data";
import { bookings } from "@/lib/data";

export async function POST(req: Request) {
  const body = await req.json();
  const status = (body.status as BookingStatus) ?? "pending";
  const booking: Booking = {
    id: Date.now().toString(),
    roomId: String(body.roomId ?? ""),
    guest: String(body.guest ?? ""),
    phone: String(body.phone ?? ""),
    checkin: String(body.checkin ?? ""),
    checkout: String(body.checkout ?? ""),
    total: Number(body.total) || 0,
    deposit: body.deposit != null && body.deposit !== "" ? Number(body.deposit) : undefined,
    status: ["confirmed", "pending", "cancelled"].includes(status)
      ? status
      : "pending",
  };
  bookings.push(booking);
  return Response.json({ success: true, booking });
}

export async function GET() {
  return Response.json(bookings);
}
