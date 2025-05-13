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
    <div className="grid grid-cols-1 place-items-center gap-4 p-4 lg:grid-cols-2 2xl:grid-cols-3">
      {query.data.map((order) => (
        <OrderCard key={order.id} userType="user" order={order} onClickRoute="requests/user" />
      ))}
    </div>
  );
}
