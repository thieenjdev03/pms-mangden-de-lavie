"use client";

import { motion } from "framer-motion";
import { SectionContainer } from "@/components/layout/section-container";
import { PropertyCard } from "@/components/home/property-card";
import { SectionHeading } from "@/components/shared/section-heading";
import type { PropertyForHome } from "@/types/accommodation";

type PropertyListSectionProps = {
  properties: PropertyForHome[];
};

export function PropertyListSection({ properties }: PropertyListSectionProps) {
  return (
    <SectionContainer id="co-so">
      <SectionHeading
        eyebrow="Chọn nơi lưu trú"
        title="Hai villa — mỗi cơ sở một danh sách loại phòng riêng"
        subtitle="Mỗi thẻ hiển thị các loại phòng thuộc đúng cơ sở đó. Bấm vào villa để xem ảnh, bảng giá đầy đủ và đặt phòng."
      />
      <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((p, i) => (
          <motion.li
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
          >
            <PropertyCard property={p} />
          </motion.li>
        ))}
      </ul>
    </SectionContainer>
  );
}
