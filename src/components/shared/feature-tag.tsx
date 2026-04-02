import { Badge } from "@/components/ui/badge";

type FeatureTagProps = {
  children: React.ReactNode;
};

export function FeatureTag({ children }: FeatureTagProps) {
  return <Badge variant="secondary">{children}</Badge>;
}
