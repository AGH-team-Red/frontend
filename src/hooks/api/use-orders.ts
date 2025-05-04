import { useQuery } from '@tanstack/react-query';
import { Request } from '@/lib/types';
import { fetchOrders } from '@/api/orders';

const useOrders = () => {
  const { error, data, isLoading } = useQuery<Request[]>({
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
