import { FeatureTag } from "@/components/shared/feature-tag";
import type { Property } from "@/types/accommodation";

type PropertyOverviewProps = {
  property: Property;
  highlights: string[];
};

export function PropertyOverview({ property, highlights }: PropertyOverviewProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <div className="grid gap-10 lg:grid-cols-[1fr_280px] lg:gap-14">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-heal-text md:text-3xl">
            Giới thiệu
          </h2>
          <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-heal-text-secondary md:text-lg">
            {property.fullDescription}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {highlights.map((h) => (
              <li key={h}>
                <FeatureTag>{h}</FeatureTag>
              </li>
            ))}
          </ul>
        </div>
        <aside className="rounded-2xl border border-heal-primary-200/80 bg-heal-primary-50/50 p-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-heal-text-muted">
            Địa chỉ
          </h3>
          <p className="mt-2 text-sm font-medium text-heal-text">{property.address}</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-heal-text-muted">
            Ghi chú bản đồ
          </p>
          <p className="mt-2 text-sm text-heal-text-secondary">{property.mapLabel}</p>
        </aside>
      </div>
    </div>
  );
}
