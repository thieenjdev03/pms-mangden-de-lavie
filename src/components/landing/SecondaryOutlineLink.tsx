import type { ReactNode } from "react";

type SecondaryOutlineLinkProps = {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
};

/**
 * Softer than primary CTA: outline pill, opens in new tab, hover underline + tint.
 */
export default function SecondaryOutlineLink({ href, children, icon }: SecondaryOutlineLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-body group inline-flex items-center justify-center gap-2 rounded-full border border-heal-primary-300/70 bg-white/35 px-5 py-2.5 text-base font-medium text-heal-primary-800 transition-colors hover:border-heal-primary-500 hover:bg-white/55 hover:text-heal-accent hover:underline hover:underline-offset-4 md:px-6"
    >
      {icon ? <span className="text-heal-primary-600 transition-colors group-hover:text-heal-accent">{icon}</span> : null}
      <span>{children}</span>
    </a>
  );
}
