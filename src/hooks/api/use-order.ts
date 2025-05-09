'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchOrder } from '@/api/orders';
import { Order } from '@/lib/types';

const useOrder = (orderId: string) => {
  const { data, error, isLoading } = useQuery<Order>({
    queryFn: async () => await fetchOrder(orderId),
    queryKey: ['order', orderId]
  });

  return {
    data,
    error,
    isLoading
  };
};

export { useOrder };
