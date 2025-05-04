'use client';
import OrderCard from '@/components/OrderCard/OrderCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { OrderStatus } from '@/lib/types';
import Link from 'next/link';
import { useState } from 'react';
import { useOrders } from '@/hooks/api/use-orders';

type RequestStatusFilter = OrderStatus | 'All';

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

  return (
    <div className="space-y-4 p-4">
      <Link href="/requests/create-request" className="block">
        <Button>New order</Button>
      </Link>

      <div className="bg-card flex justify-evenly border p-2">
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

      {orders.data.map((order) => (
        <OrderCard key={order.name} userType="client" order={order} onClickRoute="requests/customer" />
      ))}
    </div>
  );
}
