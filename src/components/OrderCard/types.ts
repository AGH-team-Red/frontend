import { Order } from '@/lib/types';

export type OrderCardProps = {
  userType: 'user' | 'client';
  orderId: string;
  onClickRoute: string;
};

export type TCardDetails = {
  icon: React.ReactNode;
  label: string;
  values: string;
};

export type UserDetails = {
  userType: 'user' | 'client';
  order: Order;
};

export type ClientDetails = {
  userType: 'client' | 'user';
  order: Order;
};
