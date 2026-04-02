import { SectionContainer } from "@/components/layout/section-container";
import { RoomTypeCard } from "@/components/property/room-type-card";
import { SectionHeading } from "@/components/shared/section-heading";
import type { Property, RoomTypeWithStats } from "@/types/accommodation";

type RoomTypeListProps = {
  property: Property;
  roomTypes: RoomTypeWithStats[];
};

export function RoomTypeList({ property, roomTypes }: RoomTypeListProps) {
  const kind = property.type === "villa" ? "villa" : "homestay";

  return (
    <SectionContainer id="loai-phong" className="bg-heal-neutral-soft/40 scroll-mt-24">
      <div className="rounded-3xl border border-heal-primary-200/70 bg-white/70 p-1 shadow-sm md:p-2">
        <div className="rounded-2xl border-l-4 border-heal-accent bg-heal-primary-50/30 px-4 py-5 md:px-6 md:py-6">
          <SectionHeading
            align="left"
            eyebrow={`Loại phòng theo từng ${kind}`}
            title={`Loại phòng tại ${property.name}`}
            subtitle={`Các hạng phòng dưới đây chỉ thuộc ${property.name}, không dùng chung với cơ sở khác. Mã phòng cụ thể nằm trong “Chi tiết & giá”.`}
            className="!mb-8 md:!mb-10"
          />
          <ul className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {roomTypes.map((rt) => (
              <li key={rt.id}>
                <RoomTypeCard room={rt} property={property} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionContainer>
  );
}
