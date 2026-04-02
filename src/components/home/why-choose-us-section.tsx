"use client";

import { motion } from "framer-motion";
import { SectionContainer } from "@/components/layout/section-container";
import { SectionHeading } from "@/components/shared/section-heading";

const items = [
  {
    title: "Giá & chính sách rõ ràng",
    body: "Bảng giá ngày thường / cuối tuần được trình bày dễ đọc. Lễ Tết có mức riêng — luôn ghi chú trước khi bạn cọc.",
  },
  {
    title: "Tiện nghi đủ để ở dài ngày",
    body: "Bếp, máy giặt, wifi ổn định và không gian chung ấm — phù hợp remote work nhẹ hoặc nghỉ cùng gia đình.",
  },
  {
    title: "Hỗ trợ nhanh qua Zalo",
    body: "Đội ngũ phản hồi linh hoạt trong khung giờ hành chính; tư vấn chọn phòng theo số người & ngân sách.",
  },
];

export function WhyChooseUsSection() {
  return (
    <SectionContainer className="bg-white">
      <SectionHeading
        eyebrow="Vì sao chọn De Lavie"
        title="Thiết kế cho người cần “dừng một nhịp”"
        subtitle="Chúng tôi tối ưu cho trải nghiệm thật — không phô trương thừa, không thông tin rối."
      />
      <ul className="grid gap-6 md:grid-cols-3">
        {items.map((item, i) => (
          <motion.li
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.45 }}
            className="rounded-2xl border border-heal-primary-200/70 bg-heal-primary-50/40 p-6 shadow-sm"
          >
            <h3 className="font-heading text-lg font-semibold text-heal-text">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-heal-text-secondary">{item.body}</p>
          </motion.li>
        ))}
      </ul>
    </SectionContainer>
  );
}
