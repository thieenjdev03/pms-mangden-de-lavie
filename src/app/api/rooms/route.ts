import type { RoomUnit, RoomUnitWithDetails } from "@/lib/data";
import {
  enrichRoomUnit,
  getRoomTypeById,
  isRoomCodeTakenInVilla,
  rooms,
} from "@/lib/data";

export async function GET() {
  const payload: RoomUnitWithDetails[] = rooms.map((r) => enrichRoomUnit(r));
  return Response.json(payload);
}

function nextRoomUnitId(): string {
  return `r${Date.now()}`;
}

export async function POST(req: Request) {
  const body = await req.json();
  const villaId = String(body.villaId ?? "").trim();
  const roomTypeId = String(body.roomTypeId ?? "").trim();
  const roomCode = String(body.roomCode ?? "").trim();
  if (!villaId || !roomTypeId || !roomCode) {
    return Response.json({ error: "villaId, roomTypeId, roomCode required" }, { status: 400 });
  }
  const rt = getRoomTypeById(roomTypeId);
  if (!rt || rt.villaId !== villaId) {
    return Response.json({ error: "invalid roomTypeId for villa" }, { status: 400 });
  }
  if (isRoomCodeTakenInVilla(villaId, roomCode)) {
    return Response.json({ error: "roomCode already exists in this villa" }, { status: 409 });
  }
  const floor = body.floor != null && String(body.floor).trim() !== "" ? String(body.floor).trim() : undefined;
  const displayName =
    body.displayName != null && String(body.displayName).trim() !== ""
      ? String(body.displayName).trim()
      : undefined;
  const status =
    body.status === "available" || body.status === "occupied" || body.status === "maintenance"
      ? body.status
      : "available";
  const unit: RoomUnit = {
    id: nextRoomUnitId(),
    villaId,
    roomTypeId,
    roomCode,
    floor,
    displayName,
    status,
  };
  rooms.push(unit);
  return Response.json({ success: true, room: enrichRoomUnit(unit) });
}
