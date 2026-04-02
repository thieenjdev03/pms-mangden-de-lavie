import type { RoomType } from "@/lib/data";
import { rooms, roomTypes } from "@/lib/data";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, context: RouteContext) {
  const { id } = await context.params;
  const idx = roomTypes.findIndex((t) => t.id === id);
  if (idx === -1) {
    return Response.json({ error: "not found" }, { status: 404 });
  }
  const body = await req.json();
  const prev = roomTypes[idx];
  const name =
    body.name != null && String(body.name).trim() !== "" ? String(body.name).trim() : prev.name;
  const next: RoomType = { ...prev, name };
  roomTypes[idx] = next;
  return Response.json({ success: true, roomType: next });
}

export async function DELETE(_req: Request, context: RouteContext) {
  const { id } = await context.params;
  const idx = roomTypes.findIndex((t) => t.id === id);
  if (idx === -1) {
    return Response.json({ error: "not found" }, { status: 404 });
  }
  if (rooms.some((r) => r.roomTypeId === id)) {
    return Response.json({ error: "room type has room units" }, { status: 409 });
  }
  roomTypes.splice(idx, 1);
  return Response.json({ success: true });
}
