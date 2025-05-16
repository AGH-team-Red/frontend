'use client';

import OrderCard from '@/components/OrderCard/OrderCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useOrders } from '@/hooks/api/use-orders';
import type { OrderStatus } from '@/lib/types';
import Link from 'next/link';
import { useState } from 'react';

type RequestStatusFilter = 'All' | OrderStatus;

const FILTER_OPTIONS: RequestStatusFilter[] = ['All', 'Active', 'Pending', 'Completed', 'Expired'];

export default function Requests() {
  const [activeFilter, setActiveFilter] = useState<RequestStatusFilter>('All');
  const orders = useOrders();

  if (orders.isLoading) {
    return <div>Loading ...</div>;
  }

  if (orders.error || !orders.data) {
    return <div>Error</div>;
  }

  const filteredOrders =
    activeFilter === 'All'
      ? orders.data
      : orders.data.filter((order) => {
          return order.status.toLowerCase() === activeFilter.toLowerCase();
        });

  return (
    <div className="mx-auto w-full max-w-7xl space-y-4 p-4">
      <Link href="/order/create-order" className="block">
        <Button className="cursor-pointer">New order</Button>
      </Link>

      <div className="bg-card mx-auto flex w-fit justify-between gap-1 rounded-md border p-2 py-2 sm:gap-2 md:mx-0 md:gap-4">
        {FILTER_OPTIONS.map((filter) => (
          <Badge
            key={filter}
            className="cursor-pointer"
            variant={activeFilter === filter ? 'default' : 'secondary'}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 place-items-center gap-2 lg:grid-cols-2 2xl:grid-cols-3">
        {filteredOrders.map((order) => (
          <OrderCard key={order.id} userType="client" orderId={order.id} onClickRoute="order/" />
        ))}
      </div>
    </div>
  );
}
