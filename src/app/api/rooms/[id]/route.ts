import type { RoomUnit } from "@/lib/data";
import {
  bookings,
  enrichRoomUnit,
  getRoomTypeById,
  isRoomCodeTakenInVilla,
  rooms,
} from "@/lib/data";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, context: RouteContext) {
  const { id } = await context.params;
  const idx = rooms.findIndex((r) => r.id === id);
  if (idx === -1) {
    return Response.json({ error: "not found" }, { status: 404 });
  }
  const body = await req.json();
  const prev = rooms[idx];
  const villaId = body.villaId != null ? String(body.villaId).trim() : prev.villaId;
  const roomTypeId = body.roomTypeId != null ? String(body.roomTypeId).trim() : prev.roomTypeId;
  const roomCode = body.roomCode != null ? String(body.roomCode).trim() : prev.roomCode;
  if (!roomCode) {
    return Response.json({ error: "roomCode required" }, { status: 400 });
  }
  const rt = getRoomTypeById(roomTypeId);
  if (!rt || rt.villaId !== villaId) {
    return Response.json({ error: "invalid roomTypeId for villa" }, { status: 400 });
  }
  if (isRoomCodeTakenInVilla(villaId, roomCode, id)) {
    return Response.json({ error: "roomCode already exists in this villa" }, { status: 409 });
  }
  let floor: string | undefined = prev.floor;
  if (body.floor === null || body.floor === "") floor = undefined;
  else if (body.floor != null) floor = String(body.floor).trim() || undefined;
  let displayName: string | undefined = prev.displayName;
  if (body.displayName === null || body.displayName === "") displayName = undefined;
  else if (body.displayName != null) displayName = String(body.displayName).trim() || undefined;
  let status = prev.status ?? "available";
  if (body.status === "available" || body.status === "occupied" || body.status === "maintenance") {
    status = body.status;
  }
  const next: RoomUnit = {
    ...prev,
    villaId,
    roomTypeId,
    roomCode,
    floor,
    displayName,
    status,
  };
  rooms[idx] = next;
  return Response.json({ success: true, room: enrichRoomUnit(next) });
}

export async function DELETE(_req: Request, context: RouteContext) {
  const { id } = await context.params;
  const idx = rooms.findIndex((r) => r.id === id);
  if (idx === -1) {
    return Response.json({ error: "not found" }, { status: 404 });
  }
  if (bookings.some((b) => b.roomId === id)) {
    return Response.json({ error: "room has bookings" }, { status: 409 });
  }
  rooms.splice(idx, 1);
  return Response.json({ success: true });
}
