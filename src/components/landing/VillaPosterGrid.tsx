import Image from "next/image";
import { landingVillaPosters } from "@/lib/landingVillas";

/**
 * Two villa detail posters (portrait PNGs) under the hero banner.
 */
export default function VillaPosterGrid() {
  return (
    <div className="mt-12 w-full max-w-2xl">
      <h2 className="type-h2 text-center text-heal-text">Chi tiết từng căn</h2>
      <p className="font-body mt-4 text-center text-base leading-relaxed text-heal-text-secondary">
        Poster CasaBlanca & Sala — lướt để xem tiện nghi và hình ảnh thật từ chỗ nghỉ.
      </p>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6">
        {landingVillaPosters.map((villa) => (
          <figure key={villa.name} className="m-0 text-center">
            <div className="relative mx-auto w-full max-w-[300px] overflow-hidden rounded-2xl border border-heal-primary-200/50 bg-[#F9F1EB]/80 shadow-[0_8px_30px_rgba(47,78,64,0.08)] ring-1 ring-white/40 sm:max-w-none">
              <div className="relative aspect-[3/4] w-full sm:aspect-[5/7]">
                <Image
                  src={villa.src}
                  alt={villa.alt}
                  fill
                  className="object-contain object-center transition-transform duration-500 hover:scale-[1.01]"
                  sizes="(max-width: 640px) 100vw, 45vw"
                  priority={false}
                />
              </div>
            </div>
            <figcaption className="mt-4 px-1">
              <span className="type-h3 block text-heal-text">{villa.name}</span>
              <span className="font-body type-small mt-2 block text-heal-text-muted">{villa.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
