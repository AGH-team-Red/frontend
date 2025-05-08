'use client';

import { useMutation } from '@tanstack/react-query';
import { postOrder } from '@/api/orders';
import { Order } from '@/lib/types';

const useCreateOrder = () => {
  const mutation = useMutation({
    mutationFn: async (orderData: Order) => await postOrder(orderData),
    mutationKey: ['orderData']
  });

  return mutation;
};

export { useCreateOrder };
