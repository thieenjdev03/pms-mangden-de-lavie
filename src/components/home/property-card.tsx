import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FeatureTag } from "@/components/shared/feature-tag";
import { PriceDisplay } from "@/components/shared/price-display";
import type { PropertyForHome } from "@/types/accommodation";
import { formatPriceVnd } from "@/lib/utils/format-price";
import { landingLinks } from "@/lib/landingLinks";

type PropertyCardProps = {
  property: PropertyForHome;
};

export function PropertyCard({ property }: PropertyCardProps) {
  const typeLabel = property.type === "villa" ? "Villa" : "Homestay";

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-[0_12px_40px_-12px_rgba(31,77,58,0.2)]">
      <div className="relative aspect-[16/10]">
        <Image
          src={property.coverImage}
          alt={property.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-heal-primary-800 shadow-sm backdrop-blur">
          {typeLabel}
        </span>
      </div>
      <CardContent className="flex flex-1 flex-col pt-5">
        <h3 className="font-heading text-xl font-semibold text-heal-text">{property.name}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-heal-text-secondary">
          {property.shortDescription}
        </p>
        <div className="mt-4">
          <PriceDisplay amount={property.priceFrom} size="lg" />
        </div>
        <ul className="mt-4 flex flex-wrap gap-2">
          {property.propertyHighlights.map((h) => (
            <li key={h}>
              <FeatureTag>{h}</FeatureTag>
            </li>
          ))}
        </ul>

        {property.roomTypesAtProperty.length > 0 ? (
          <div className="mt-5 rounded-2xl border border-heal-primary-200/80 bg-gradient-to-b from-heal-primary-50/80 to-white/90 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-heal-primary-700">
              Loại phòng tại {property.name}
            </p>
            <ul className="mt-3 space-y-2 border-t border-heal-primary-100/90 pt-3">
              {property.roomTypesAtProperty.map((rt) => (
                <li key={rt.id} className="flex items-start justify-between gap-3 text-sm">
                  <span className="min-w-0 flex-1 leading-snug text-heal-text">{rt.name}</span>
                  <span className="shrink-0 text-xs font-medium text-heal-accent">
                    {formatPriceVnd(rt.priceFrom)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] text-heal-text-muted">
              Giá từ / đêm (ngày thường). Chi tiết và giá cuối tuần xem trong trang villa.
            </p>
          </div>
        ) : null}

        <p className="mt-4 text-xs text-heal-text-muted">
          {property.roomTypeCount} loại phòng · Nhận phòng từ {property.checkInTime}
        </p>
      </CardContent>
      <CardFooter className="mt-auto flex flex-col gap-2 border-t border-heal-primary-100/80 bg-heal-primary-50/30 pt-4 sm:flex-row">
        <Button asChild variant="default" className="w-full sm:flex-1">
          <Link href={`/properties/${property.slug}#loai-phong`}>Xem villa và loại phòng</Link>
        </Button>
        <Button asChild variant="secondary" className="w-full sm:flex-1">
          <Link href={landingLinks.zalo} target="_blank" rel="noopener noreferrer">
            Liên hệ đặt phòng
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
