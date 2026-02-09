import type { ReactNode } from "react";
import { ScrollToTop } from "@/components/blog/ScrollToTop";

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ScrollToTop />
    </div>
  );
}
