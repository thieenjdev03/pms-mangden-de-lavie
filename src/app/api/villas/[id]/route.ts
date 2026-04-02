import { rooms, roomTypes, villas } from "@/lib/data";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, context: RouteContext) {
  const { id } = await context.params;
  const idx = villas.findIndex((v) => v.id === id);
  if (idx === -1) {
    return Response.json({ error: "not found" }, { status: 404 });
  }
  const body = await req.json();
  const prev = villas[idx];
  const name =
    body.name != null && String(body.name).trim() !== ""
      ? String(body.name).trim()
      : prev.name;
  let shortLabel: string | undefined = prev.shortLabel;
  if (body.shortLabel === null || body.shortLabel === "") {
    shortLabel = undefined;
  } else if (body.shortLabel != null) {
    shortLabel = String(body.shortLabel).trim() || undefined;
  }
  const next = { ...prev, name, shortLabel };
  villas[idx] = next;
  return Response.json({ success: true, villa: next });
}

export async function DELETE(_req: Request, context: RouteContext) {
  const { id } = await context.params;
  const idx = villas.findIndex((v) => v.id === id);
  if (idx === -1) {
    return Response.json({ error: "not found" }, { status: 404 });
  }
  if (rooms.some((r) => r.villaId === id)) {
    return Response.json(
      { error: "villa has rooms; remove or reassign rooms first" },
      { status: 409 },
    );
  }
  if (roomTypes.some((t) => t.villaId === id)) {
    return Response.json(
      { error: "villa has room types; remove room types first" },
      { status: 409 },
    );
  }
  villas.splice(idx, 1);
  return Response.json({ success: true });
}
