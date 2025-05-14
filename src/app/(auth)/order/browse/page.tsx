'use client';

import OrderCard from '@/components/OrderCard/OrderCard';
import { useOrders } from '@/hooks/api/use-orders';
import { Skeleton } from '@/components/ui/skeleton';

export default function Requests() {
  const { data, isLoading, error } = useOrders();

  if (isLoading) {
    return <Skeleton />;
  }

  if (error || !data) {
    return <div>Error</div>;
  }

  console.log('data order page ', data);

  return (
    <div className="grid grid-cols-1 place-items-center gap-4 p-4 lg:grid-cols-2 2xl:grid-cols-3">
      {data.map((order) => (
        <OrderCard key={order.id} userType="user" orderId={order.id} onClickRoute="order/browse" />
      ))}
    </div>
  );
}
