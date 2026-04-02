import { cn } from "@/lib/cn";

type SectionContainerProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Vertical padding scale */
  py?: "sm" | "md" | "lg";
};

const pyMap = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-28",
};

export function SectionContainer({ children, className, id, py = "md" }: SectionContainerProps) {
  return (
    <section id={id} className={cn(pyMap[py], className)}>
      <div className="mx-auto w-full max-w-6xl px-4 md:px-6">{children}</div>
    </section>
  );
}
