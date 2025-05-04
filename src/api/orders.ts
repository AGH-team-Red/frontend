import httpClient from '@/lib/http-client';
import { Request } from '@/lib/types';

const fetchOrders = async (): Promise<Array<Request>> => {
  const response = await httpClient.get<Array<Request>>('http://localhost:3001/orders', {});

  return response;
};

const fetchOrder = async (orderId: string): Promise<Request> => {
  const response = await httpClient.get<Request>(`http://localhost:3001/orders/${orderId}`, {});

  return response;
};

export { fetchOrders, fetchOrder };
