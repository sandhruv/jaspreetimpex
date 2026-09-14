"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import WhatsApp from "./WhatsApp";

const hideLayoutPaths = ["/admin", "/login"];

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = hideLayoutPaths.some((p) => pathname.startsWith(p));

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsApp />
    </>
  );
}
