import { SectionContainer } from "@/components/layout/section-container";
import { AmenityBadge } from "@/components/shared/amenity-badge";
import { SectionHeading } from "@/components/shared/section-heading";

type PropertyAmenitiesProps = {
  items: string[];
  propertyName: string;
};

export function PropertyAmenities({ items, propertyName }: PropertyAmenitiesProps) {
  return (
    <SectionContainer py="sm">
      <SectionHeading
        align="left"
        eyebrow="Tiện ích chung"
        title={`Tiện nghi tại ${propertyName}`}
        subtitle="Áp dụng cho khu cơ sở — từng hạng phòng có thêm tiện ích riêng trong thẻ phòng."
      />
      <ul className="flex flex-wrap gap-2">
        {items.map((a) => (
          <li key={a}>
            <AmenityBadge label={a} />
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}
