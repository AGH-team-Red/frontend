"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

export default function Nav() {
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean);

    const breadcrumbItems = [];

    breadcrumbItems.push(
      <BreadcrumbItem key="home">
        <BreadcrumbLink href="/">Menu</BreadcrumbLink>
      </BreadcrumbItem>,
    );

    if (segments.length > 0) {
      breadcrumbItems.push(<BreadcrumbSeparator key="sep-home" />);
    }

    let path = "";

    segments.forEach((segment, idx) => {
      path += `/${segment}`;

      const formattedSegment = segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

      breadcrumbItems.push(
        <BreadcrumbItem key={path}>
          {idx === segments.length - 1 ? (
            <BreadcrumbPage>{formattedSegment}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink href={path}>{formattedSegment}</BreadcrumbLink>
          )}
        </BreadcrumbItem>,
      );

      if (idx < segments.length - 1) {
        breadcrumbItems.push(<BreadcrumbSeparator key={`sep-${idx}`} />);
      }
    });

    return breadcrumbItems;
  };

  return (
    <nav className="flex h-[7vh] items-center justify-between bg-zinc-900 p-5 text-white">
      <Breadcrumb>
        <BreadcrumbList>{generateBreadcrumbs()}</BreadcrumbList>
      </Breadcrumb>
      <div className="text-lg">logo</div>
    </nav>
  );
}
