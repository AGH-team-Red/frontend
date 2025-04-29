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

import { mockedRequests } from "@/lib/mock";

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

      let displayText = segment;
      if (segments[0] === "requests" && idx === 1) {
        const requestId = segment;
        const request = mockedRequests.find((req) => req.id === requestId);
        if (request) {
          displayText = request.name;
        }
      } else {
        displayText = segment
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());
      }

      breadcrumbItems.push(
        <BreadcrumbItem key={path}>
          {idx === segments.length - 1 ? (
            <BreadcrumbPage>{displayText}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink href={path}>{displayText}</BreadcrumbLink>
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
