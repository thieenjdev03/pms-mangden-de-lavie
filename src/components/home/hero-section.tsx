"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/layout/section-container";
import { landingLinks } from "@/lib/landingLinks";

export function HeroSection() {
  return (
    <SectionContainer py="sm" className="!pt-6 md:!pt-10">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-heal-primary-600 md:text-[11px]">
            Hai villa · Măng Đen De Lavie
          </p>
          <h1 className="font-heading text-4xl font-semibold leading-[1.1] tracking-tight text-heal-text md:text-5xl lg:text-[3.25rem]">
            Nghỉ dưỡng lành — giữa rừng thông và sương sớm
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-heal-text-secondary md:text-lg">
            CasaBlanca Villa và Sala Villa được chăm chút cho kỳ nghỉ cao nguyên: không gian riêng tư, tiện
            nghi đầy đủ, và nhịp chậm giữa rừng thông Măng Đen.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="shadow-lg">
              <Link href="/#co-so">Khám phá cơ sở</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={landingLinks.zalo} target="_blank" rel="noopener noreferrer">
                Liên hệ đặt phòng
              </Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[0_20px_50px_-20px_rgba(31,77,58,0.35)] ring-1 ring-heal-primary-200/80">
            <Image
              src="/images/properties/sala/cover.jpg"
              alt="Không gian villa Măng Đen De Lavie"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>
          <p className="mt-4 text-center text-xs text-heal-text-muted md:text-left">
            Ảnh minh họa cơ sở — bộ sưu tập đầy đủ trong album.
          </p>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
