import type { ReactNode } from "react";

type PageWrapperProps = {
  children: ReactNode;
};

/**
 * Full-viewport shell with soft neutral base and blurred organic blobs (Nature Healing).
 */
export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="relative flex min-h-screen flex-col bg-heal-neutral-light text-heal-text">
      {/* Organic blurred shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-[20%] top-[10%] h-[min(70vw,520px)] w-[min(90vw,640px)] rounded-full bg-heal-primary-300/45 blur-[80px]" />
        <div className="absolute -right-[15%] top-[35%] h-[min(65vw,480px)] w-[min(85vw,560px)] rounded-full bg-heal-primary-400/35 blur-[90px]" />
        <div className="absolute bottom-[-10%] left-[20%] h-[min(55vw,400px)] w-[min(70vw,500px)] rounded-full bg-heal-primary-200/50 blur-[70px]" />
        <div className="absolute right-[10%] top-[-5%] h-[280px] w-[280px] rounded-full bg-sky-200/30 blur-[64px]" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-1 flex-col">{children}</div>
    </div>
  );
}
