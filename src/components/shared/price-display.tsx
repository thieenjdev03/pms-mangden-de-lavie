import { formatPriceFromLabel, formatPriceVnd } from "@/lib/utils/format-price";
import { cn } from "@/lib/cn";

type PriceDisplayProps = {
  amount: number;
  /** Show "Từ …" prefix */
  from?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizeCls = {
  sm: "text-sm font-semibold",
  md: "text-lg font-semibold",
  lg: "text-2xl font-bold tracking-tight",
};

export function PriceDisplay({ amount, from = true, className, size = "md" }: PriceDisplayProps) {
  const text = from ? formatPriceFromLabel(amount) : formatPriceVnd(amount);
  return <span className={cn("text-heal-accent", sizeCls[size], className)}>{text}</span>;
}
