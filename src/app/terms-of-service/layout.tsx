import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Jaspreet Impex | Terms & Conditions",
  description:
    "Terms of Service for Jaspreet Impex - Terms and conditions for using our website and logistics services.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://jaspreetimpex.com/terms-of-service",
  },
};

export default function TermsOfServiceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
