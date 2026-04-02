"use client";

import { motion } from "framer-motion";
import { SectionContainer } from "@/components/layout/section-container";
import { SectionHeading } from "@/components/shared/section-heading";

export function BrandStorySection() {
  return (
    <SectionContainer className="bg-heal-neutral-soft/80">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeading
          eyebrow="Câu chuyện thương hiệu"
          title="Chúng tôi tin vào những kỳ nghỉ “đủ nhẹ”"
          subtitle="Không cần checklist dày cộm — chỉ cần phòng sạch, bếp ấm, cây xanh và một buổi tối được ngồi lại bên nhau. De Lavie chọn lối phục vụ gần gũi, rõ ràng về giá và linh hoạt theo từng nhóm khách."
        />
        <div className="mx-auto grid max-w-3xl gap-6 text-center text-base leading-relaxed text-heal-text-secondary md:text-lg">
          <p>
            Măng Đen mang trong mình khí hậu lành và cảnh quan an yên. Chúng tôi thiết kế trải nghiệm lưu
            trú để bạn cảm nhận trọn vẹn điều đó — từ ánh sáy ban mai đến tiếng lá thông chiều muộn.
          </p>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
