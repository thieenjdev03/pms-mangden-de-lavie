import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PriceDisplay } from "@/components/shared/price-display";
import { RoomTypeDetailModal } from "@/components/property/room-type-detail-modal";
import type { Property, RoomTypeWithStats } from "@/types/accommodation";

type RoomTypeCardProps = {
  room: RoomTypeWithStats;
  property: Property;
};

export function RoomTypeCard({ room, property }: RoomTypeCardProps) {
  const img = room.images[0] ?? property.coverImage;

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="relative aspect-[16/10]">
        <Image src={img} alt={room.name} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
        {room.featuredBadge ? (
          <Badge className="absolute left-3 top-3 bg-heal-accent text-white">{room.featuredBadge}</Badge>
        ) : room.featured ? (
          <Badge className="absolute left-3 top-3 bg-heal-accent text-white">Nổi bật</Badge>
        ) : null}
      </div>
      <CardContent className="flex flex-1 flex-col pt-5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-heal-primary-600">
          {property.name}
        </p>
        <h3 className="mt-1 font-heading text-lg font-semibold text-heal-text">{room.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-heal-text-secondary">{room.description}</p>
        <ul className="mt-3 space-y-1 text-xs text-heal-text-muted">
          <li>
            Sức chứa: {room.capacity.adults} người lớn
            {room.capacity.children != null ? ` + ${room.capacity.children} trẻ em` : ""}
          </li>
          <li>Giường: {room.bedInfo}</li>
          <li>Diện tích: {room.areaSqm} m²</li>
        </ul>
        <div className="mt-4">
          <PriceDisplay amount={room.priceFrom} />
        </div>
        <p className="mt-2 text-xs text-heal-text-muted">
          {room.availableRoomCount > 0
            ? `Còn ${room.availableRoomCount} phòng · ${room.roomCodes.slice(0, 3).join(", ")}${room.roomCodes.length > 3 ? "…" : ""}`
            : "Đang full (theo dữ liệu demo)"}
        </p>
      </CardContent>
      <CardFooter className="mt-auto border-t border-heal-primary-100/80 pt-4">
        <RoomTypeDetailModal
          room={room}
          propertyName={property.name}
          contact={property.contact}
          trigger={
            <Button variant="default" className="w-full">
              Chi tiết & giá
            </Button>
          }
        />
      </CardFooter>
    </Card>
  );
}
