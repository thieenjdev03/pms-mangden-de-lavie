"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionContainer } from "@/components/layout/section-container";
import { Button } from "@/components/ui/button";
import { ContactButtons } from "@/components/shared/contact-buttons";
import { landingLinks } from "@/lib/landingLinks";
import type { PropertyContact } from "@/types/accommodation";

const defaultContact: PropertyContact = {
  phone: "+84356279677",
  phoneDisplay: landingLinks.zaloDisplay,
  zaloUrl: landingLinks.zalo,
  facebookUrl: landingLinks.fanpage,
  messengerUrl: "https://m.me/Mangdendalavie",
};

export function FinalCtaSection() {
  return (
    <SectionContainer id="lien-he" className="pb-20 md:pb-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-heal-primary-800 via-heal-accent to-heal-primary-700 px-6 py-12 text-center text-white shadow-xl md:px-14 md:py-16"
      >
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          aria-hidden
        />
        <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
          Sẵn sàng cho một kỳ nghỉ lành?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
          Nhắn Zalo để được tư vấn phòng phù hợp — chúng tôi sẽ phản hồi với bảng giá và khuyến nghị theo số
          người đi cùng bạn.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4">
          <ContactButtons
            contact={defaultContact}
            className="justify-center"
            layout="stack"
            onDark
          />
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="border-white/30 bg-white/15 text-white hover:bg-white/25"
          >
            <Link href={landingLinks.albumDrive} target="_blank" rel="noopener noreferrer">
              Xem album ảnh
            </Link>
          </Button>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
