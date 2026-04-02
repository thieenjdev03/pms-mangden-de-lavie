import type { RoomType } from "@/lib/data";
import { roomTypes, villas } from "@/lib/data";

function nextRoomTypeId(): string {
  return `rt${Date.now()}`;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const villaId = searchParams.get("villaId");
  let list = roomTypes;
  if (villaId) {
    list = roomTypes.filter((t) => t.villaId === villaId);
  }
  return Response.json(list);
}

export async function POST(req: Request) {
  const body = await req.json();
  const villaId = String(body.villaId ?? "").trim();
  const name = String(body.name ?? "").trim();
  if (!villaId || !name) {
    return Response.json({ error: "villaId and name required" }, { status: 400 });
  }
  if (!villas.some((v) => v.id === villaId)) {
    return Response.json({ error: "villa not found" }, { status: 400 });
  }
  const rt: RoomType = {
    id: nextRoomTypeId(),
    villaId,
    name,
  };
  roomTypes.push(rt);
  return Response.json({ success: true, roomType: rt });
}
