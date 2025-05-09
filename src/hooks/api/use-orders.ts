'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchOrders } from '@/api/orders';
import { Order } from '@/lib/types';

const useOrders = () => {
  const { error, data, isLoading } = useQuery<Order[]>({
    queryFn: fetchOrders,
    queryKey: ['orders']
  });

  return {
    error,
    data,
    isLoading
  };
};

export { useOrders };
