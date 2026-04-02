import { SectionContainer } from "@/components/layout/section-container";
import { ContactButtons } from "@/components/shared/contact-buttons";
import { SectionHeading } from "@/components/shared/section-heading";
import type { Property } from "@/types/accommodation";

type PropertyContactCtaProps = {
  property: Property;
};

export function PropertyContactCta({ property }: PropertyContactCtaProps) {
  return (
    <SectionContainer className="pb-20 md:pb-28">
      <div className="rounded-3xl border border-heal-primary-200/80 bg-gradient-to-br from-heal-primary-50/90 to-white px-6 py-10 shadow-sm md:px-12 md:py-12">
        <SectionHeading
          align="left"
          eyebrow="Liên hệ"
          title={`Đặt phòng tại ${property.name}`}
          subtitle="Chúng tôi sẽ kiểm tra tình trạng phòng (theo RoomUnit trong hệ thống nội bộ) và gửi lại xác nhận. Trang này chưa có form đặt online — CTA dẫn tới Zalo / điện thoại."
        />
        <ContactButtons contact={property.contact} className="mt-4" layout="stack" />
      </div>
    </SectionContainer>
  );
}
