'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useSidebar } from '@/components/ui/sidebar';
import { useBreadcrumb } from '@/context/BreadcrumbContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { SidebarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Skeleton } from '../ui/skeleton';

export function SiteHeader() {
  const isMobile = useIsMobile();
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const { orderName } = useBreadcrumb();

  console.log('pathname', pathname);

  const isOrderBrowseSection = pathname.startsWith('/order/browse');
  const isOrderSection = pathname.startsWith('/order/') && !isOrderBrowseSection;
  const isCreateOrderSection = pathname.startsWith('/order/create-order');
  const isCreateFeature = pathname.startsWith('/order/create-feature');
  const isTasksSection = pathname.startsWith('/my-tasks');

  const pathParts = pathname.split('/').filter(Boolean);

  const shouldShowOrderName =
    (isOrderBrowseSection && pathParts.length >= 3) ||
    (isTasksSection && pathParts.length >= 2) ||
    (isOrderSection && !isCreateOrderSection && !isCreateFeature && pathParts.length >= 2);
  // (isOrderSection && !isCreateFeature && pathParts.length >= 2);

  const shouldTrimOnMobile = (isMobile && pathParts.length >= 3) || isCreateFeature;

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button className="h-8 w-8" variant="ghost" size="icon" onClick={toggleSidebar}>
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb className="grow">
          <BreadcrumbList>
            {!shouldTrimOnMobile && (
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
            )}

            {!shouldTrimOnMobile && !isTasksSection && pathname !== '/' && <BreadcrumbSeparator />}

            {isOrderSection && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Order</BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}

            {isOrderBrowseSection && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/order/browse">Browse</BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}

            {isCreateOrderSection ||
              (isCreateFeature && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/order/create-order">Create Order</BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              ))}

            {isCreateFeature && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/order/create-feature">Create Feature</BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}

            {isTasksSection && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/my-tasks">My Tasks</BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}

            {shouldShowOrderName && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {orderName ? (
                    <BreadcrumbPage className="truncate sm:max-w-none">{orderName}</BreadcrumbPage>
                  ) : (
                    <Skeleton className="h-5 w-32" />
                  )}
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex-shrink-0 justify-self-end">
          <Link href="/">
            <Image priority loading="eager" src="/logo.png" alt="Logo" width={128} height={32} className="h-8 w-32" />
          </Link>
        </div>
      </div>
    </header>
  );
}
