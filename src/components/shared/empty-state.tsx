import { cn } from "@/lib/cn";

type EmptyStateProps = {
  title: string;
  description?: string;
  className?: string;
};

export function EmptyState({ title, description, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-dashed border-heal-primary-200 bg-heal-primary-50/50 px-6 py-12 text-center",
        className,
      )}
    >
      <p className="font-medium text-heal-text">{title}</p>
      {description ? (
        <p className="mt-2 text-sm text-heal-text-secondary">{description}</p>
      ) : null}
    </div>
  );
}
