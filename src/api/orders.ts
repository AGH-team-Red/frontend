import httpClient from '@/lib/http-client';
import { Order } from '@/lib/types';

const fetchOrders = async (): Promise<Array<Order>> => {
  const response = await httpClient.get<Array<Order>>('http://localhost:3005/orders', {});

  return response;
};

const fetchOrder = async (orderId: string): Promise<Order> => {
  const response = await httpClient.get<Order>(`http://localhost:3005/orders/${orderId}`, {});

  return response;
};

const postOrder = async (orderData: Order): Promise<Order> => {
  const result = await httpClient.post<Order>(
    'http://localhost:3005/orders',
    {},
    {
      data: orderData
    }
  );

  return result;
};

export { fetchOrders, fetchOrder, postOrder };
