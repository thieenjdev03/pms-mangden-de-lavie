import { cn } from "@/lib/cn";

type AmenityBadgeProps = {
  label: string;
  className?: string;
};

export function AmenityBadge({ label, className }: AmenityBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-heal-primary-200/90 bg-heal-primary-50/90 px-3 py-1 text-xs font-medium text-heal-primary-800",
        className,
      )}
    >
      {label}
    </span>
  );
}
