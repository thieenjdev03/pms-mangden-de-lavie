import Image from "next/image";
import { landingBanner } from "@/lib/landingVillas";

/**
 * Wide brand banner above the glass card; PNG from `public/landing/banner-villa-1.png`.
 */
export default function LandingBanner() {
  return (
    <div className="landing-card-animate w-full max-w-4xl px-1">
      <figure className="m-0">
        <div className="overflow-hidden rounded-2xl border border-heal-primary-200/45 bg-[#F9F5F1] shadow-[0_12px_40px_rgba(47,78,64,0.12)] ring-1 ring-white/55">
          <div className="relative aspect-[5/2] w-full sm:aspect-[2.35/1]">
            <Image
              src={landingBanner.src}
              alt={landingBanner.alt}
              fill
              priority
              className="object-contain object-center"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>
        </div>
        <figcaption className="type-small mt-3 text-center leading-relaxed text-heal-text-muted">
          Villa & Homestay nghỉ dưỡng — sân vườn, lửa trại, BBQ, Pickleball…
        </figcaption>
      </figure>
    </div>
  );
}
