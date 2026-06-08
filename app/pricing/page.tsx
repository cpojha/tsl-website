import type { Metadata } from "next";
import PricingContent from "@/features/pricing/pricing-page";

export const metadata: Metadata = {
  title: "Pricing",
};

export default function PricingPage() {
  return <PricingContent />;
}
