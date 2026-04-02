import type { RoomType, Villa } from "@/lib/data";
import { roomTypes, villas } from "@/lib/data";

function nextVillaId(): string {
  return `v${Date.now()}`;
}

export async function GET() {
  return Response.json(villas);
}

export async function POST(req: Request) {
  const body = await req.json();
  const name = String(body.name ?? "").trim();
  if (!name) {
    return Response.json({ error: "name required" }, { status: 400 });
  }
  const shortLabel =
    body.shortLabel != null && String(body.shortLabel).trim() !== ""
      ? String(body.shortLabel).trim()
      : undefined;
  const villa: Villa = {
    id: nextVillaId(),
    name,
    ...(shortLabel ? { shortLabel } : {}),
  };
  villas.push(villa);
  const defaultType: RoomType = {
    id: `rt-${villa.id}-default`,
    villaId: villa.id,
    name: "Phòng tiêu chuẩn",
  };
  roomTypes.push(defaultType);
  return Response.json({ success: true, villa });
}
