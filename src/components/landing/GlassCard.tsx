import type { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
};

/**
 * Glassmorphism panel: white ~60% opacity, strong backdrop blur, 24px radius.
 */
export default function GlassCard({ children }: GlassCardProps) {
  return (
    <div
      className="landing-card-animate w-full max-w-4xl rounded-[24px] border border-white/20 bg-white/60 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.1)] backdrop-blur-xl md:p-12"
      role="region"
      aria-label="Coming soon"
    >
      {children}
    </div>
  );
}
