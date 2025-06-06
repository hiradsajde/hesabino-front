import { source } from "@/lib/source";
import { DocsLayout } from "@/components/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto">
      <DocsLayout tree={source.pageTree} {...baseOptions}>
        {children}
      </DocsLayout>
    </div>
  );
}
