import { SectionContainer } from "@/components/layout/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { formatPriceVnd } from "@/lib/utils/format-price";
import type { RoomTypeWithStats } from "@/types/accommodation";

type PropertyPricingSummaryProps = {
  roomTypes: RoomTypeWithStats[];
};

export function PropertyPricingSummary({ roomTypes }: PropertyPricingSummaryProps) {
  return (
    <SectionContainer py="sm">
      <SectionHeading
        align="left"
        eyebrow="Bảng giá"
        title="Tóm tắt giá theo hạng phòng"
        subtitle="Giá tham khảo mỗi đêm. Giá hiển thị ưu tiên phòng đang trống; có thể có phòng giá đặc biệt (custom) trong mock."
      />
      <div className="overflow-x-auto rounded-2xl border border-heal-primary-200/80 bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-heal-primary-200/80 bg-heal-primary-50/60">
              <th className="px-4 py-3 font-semibold text-heal-text">Hạng phòng</th>
              <th className="px-4 py-3 font-semibold text-heal-text">Từ (VNĐ/đêm)</th>
              <th className="px-4 py-3 font-semibold text-heal-text">Cuối tuần</th>
              <th className="px-4 py-3 font-semibold text-heal-text">Ngày lễ</th>
            </tr>
          </thead>
          <tbody>
            {roomTypes.map((rt) => (
              <tr key={rt.id} className="border-b border-heal-primary-100/90 last:border-0">
                <td className="px-4 py-3 font-medium text-heal-text">{rt.name}</td>
                <td className="px-4 py-3 text-heal-text-secondary">{formatPriceVnd(rt.priceFrom)}</td>
                <td className="px-4 py-3 text-heal-text-secondary">
                  {rt.weekendPrice != null ? formatPriceVnd(rt.weekendPrice) : "—"}
                </td>
                <td className="px-4 py-3 text-heal-text-secondary">
                  {rt.holidayPrice != null ? formatPriceVnd(rt.holidayPrice) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-heal-text-muted">
        Giá lễ & mùa cao điểm có thể điều chỉnh — luôn xác nhận qua Zalo/điện thoại trước khi chuyển khoản
        cọc.
      </p>
    </SectionContainer>
  );
}
