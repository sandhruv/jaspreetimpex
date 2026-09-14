import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery - Jaspreet Impex Logistics Operations & Facilities",
  description:
    "Explore Jaspreet Impex's logistics operations through our photo gallery - container terminals, warehouse operations, cargo aircraft, truck fleet, and port operations across India.",
  keywords:
    "logistics photos, warehouse operations, container terminal, cargo aircraft, truck fleet, port operations, Jaspreet Impex gallery",
  openGraph: {
    title: "Photo Gallery | Jaspreet Impex Logistics Operations",
    description:
      "Visual tour of our logistics facilities and operations across India and globally.",
    url: "https://jaspreetimpex.com/photos",
    images: [
      {
        url: "https://images.unsplash.com/photo-1494412574643-ff11b0a5eb19?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Jaspreet Impex Logistics Operations - Container Terminal",
      },
    ],
  },
  alternates: {
    canonical: "https://jaspreetimpex.com/photos",
  },
};

export default function PhotosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
