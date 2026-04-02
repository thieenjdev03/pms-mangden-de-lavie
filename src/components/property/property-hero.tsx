import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { PriceDisplay } from "@/components/shared/price-display";
import type { Property } from "@/types/accommodation";

type PropertyHeroProps = {
  property: Property;
  priceFrom: number;
};

export function PropertyHero({ property, priceFrom }: PropertyHeroProps) {
  const kind = property.type === "villa" ? "Villa" : "Homestay";

  return (
    <div className="relative">
      <div className="relative aspect-[21/9] min-h-[220px] w-full overflow-hidden md:min-h-[320px] md:rounded-3xl">
        <Image
          src={property.coverImage}
          alt={property.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <Badge className="mb-2 border-white/40 bg-white/20 text-white backdrop-blur-sm">
                {kind}
              </Badge>
              <h1 className="font-heading text-3xl font-semibold tracking-tight md:text-5xl">
                {property.name}
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-white/90 md:text-base">{property.mapLabel}</p>
            </div>
            <div className="rounded-2xl bg-white/15 px-4 py-3 text-left backdrop-blur-md md:text-right">
              <p className="text-xs uppercase tracking-wider text-white/80">Giá từ</p>
              <div className="text-white [&_span]:!text-white [&_span]:!text-2xl">
                <PriceDisplay amount={priceFrom} size="lg" />
              </div>
              <p className="mt-1 text-xs text-white/75">
                Nhận {property.checkInTime} · Trả {property.checkOutTime}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
