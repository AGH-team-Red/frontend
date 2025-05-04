'use client';

import OrderCard from '@/components/OrderCard/OrderCard';
import { useOrders } from '@/hooks/api/use-orders';
import { Skeleton } from '@/components/ui/skeleton';

export default function Requests() {
  const query = useOrders();

  if (query.isLoading) {
    return <Skeleton />;
  }

  if (query.error || !query.data) {
    return <div>Error</div>;
  }

  return (
    <div className="space-y-4 p-4">
      {query.data.map((order) => (
        <OrderCard key={order.name} userType="user" order={order} onClickRoute="requests/user" />
      ))}
    </div>
  );
}
