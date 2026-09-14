import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Jaspreet Impex | Data Protection & Privacy",
  description:
    "Privacy Policy of Jaspreet Impex - How we collect, use, and protect your personal information. Learn about our data protection practices.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://jaspreetimpex.com/privacy-policy",
  },
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
