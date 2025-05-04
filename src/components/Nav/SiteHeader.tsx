"use client";

import { Command, SidebarIcon } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { generateBreadcrumbs } from "./Nav.utils";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb className="grow">
          <BreadcrumbList>{generateBreadcrumbs({ pathname })}</BreadcrumbList>
        </Breadcrumb>
        <div className="justify-self-end">
          <Link href="/">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <Command className="size-4" />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
