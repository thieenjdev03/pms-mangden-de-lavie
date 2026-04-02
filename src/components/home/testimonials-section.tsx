"use client";

import { motion } from "framer-motion";
import { SectionContainer } from "@/components/layout/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import type { Testimonial } from "@/data/mock/testimonials";
import { getPropertyById } from "@/lib/selectors/property-selectors";

type TestimonialsSectionProps = {
  testimonials: Testimonial[];
};

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <SectionContainer className="bg-heal-neutral-soft/80">
      <SectionHeading
        eyebrow="Khách nói gì"
        title="Những chia sẻ chân thật"
        subtitle="Trích lời khách đã lưu trú — mỗi câu chuyện là động lực để chúng tôi giữ chất lượng dịch vụ."
      />
      <ul className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => {
          const prop = getPropertyById(t.propertyId);
          return (
            <motion.li
              key={t.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className="flex flex-col rounded-2xl border border-heal-primary-200/60 bg-white/90 p-6 shadow-sm"
            >
              <p className="text-sm font-medium text-heal-accent">{"★".repeat(t.rating)}</p>
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-heal-text-secondary">
                “{t.content}”
              </blockquote>
              <footer className="mt-4 border-t border-heal-primary-100 pt-4">
                <p className="text-sm font-semibold text-heal-text">{t.guestName}</p>
                {prop ? (
                  <p className="text-xs text-heal-text-muted">{prop.name}</p>
                ) : null}
              </footer>
            </motion.li>
          );
        })}
      </ul>
    </SectionContainer>
  );
}
