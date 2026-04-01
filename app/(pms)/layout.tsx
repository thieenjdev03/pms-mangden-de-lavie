import AppLayout from "@/components/layout/AppLayout";
import PmsAuthGate from "@/components/auth/PmsAuthGate";

export default function PmsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PmsAuthGate>
      <AppLayout>{children}</AppLayout>
    </PmsAuthGate>
  );
}
