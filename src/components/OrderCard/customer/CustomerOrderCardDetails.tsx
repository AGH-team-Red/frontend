'use client';

import { useOrder } from '@/hooks/api/use-order';
import { useIsMobile } from '@/hooks/use-mobile';

import { useBreadcrumb } from '@/context/BreadcrumbContext';
import DesktopOrderView from './DesktopOrderView';
import MobileOrderView from './MobileOrderView';
import { useEffect } from 'react';

export default function CustomerOrderCardDetails({ orderId }: { orderId: string }) {
  const isMobile = useIsMobile();
  const { setOrderName } = useBreadcrumb();
  const { data, isLoading, error } = useOrder(orderId);

  useEffect(() => {
    if (data?.name) {
      setOrderName(data.name);
    }

    return () => {
      setOrderName(null);
    };
  }, [data?.name, setOrderName]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (error || !data) {
    return <div>Request not found</div>;
  }

  return isMobile ? <MobileOrderView data={data} /> : <DesktopOrderView data={data} />;
}
