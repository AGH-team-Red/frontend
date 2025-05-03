"use client";

import { Breadcrumb, BreadcrumbList } from "../ui/breadcrumb";

import { usePathname } from "next/navigation";
import { generateBreadcrumbs } from "./Nav.utils";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex h-[7vh] items-center justify-between bg-zinc-900 p-5 text-white">
      <Breadcrumb>
        <BreadcrumbList>{generateBreadcrumbs({ pathname })}</BreadcrumbList>
      </Breadcrumb>
      <div className="text-lg">logo</div>
    </nav>
  );
}
