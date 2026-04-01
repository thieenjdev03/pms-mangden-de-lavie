"use client";

import { startTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAdmin } from "@/lib/auth";

type PmsAuthGateProps = {
  children: React.ReactNode;
};

/**
 * Client-side guard for PMS routes. Replace isAdmin() with real session check when backend exists.
 */
export default function PmsAuthGate({ children }: PmsAuthGateProps) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!isAdmin()) {
      router.replace("/");
      return;
    }
    startTransition(() => setAllowed(true));
  }, [router]);

  if (!allowed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
        <div
          className="h-9 w-9 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-600"
          aria-label="Loading"
        />
      </div>
    );
  }

  return <>{children}</>;
}
