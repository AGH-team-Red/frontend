import httpClient from '@/lib/http-client';
import { Request } from '@/lib/types';

const fetchOrders = async (): Promise<Array<Request>> => {
  const response = await httpClient.get<Array<Request>>('http://localhost:3001/orders', {});

  return response;
};

export { fetchOrders };
