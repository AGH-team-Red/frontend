'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useOrder } from '@/hooks/api/use-order';
import { useIsMobile } from '@/hooks/use-mobile';
import { Feature, Order } from '@/lib/types';
import { CircleDollarSign, Languages, SwatchBook } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatDateRange } from '@/lib/utils';
import { Calendar, Clock, FileText, ImageIcon } from 'lucide-react';
import { OrderInfoItem } from './OrderInfoItem';
import MobileOrderView from './MobileOrderView';
import DesktopOrderView from './DesktopOrderView';

const STATUS_DISPLAY: Record<string, string> = {
  active: 'ACT',
  pending: 'PEN',
  completed: 'CMP',
  expired: 'EXP'
};

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-500 hover:bg-green-600',
  pending: 'bg-yellow-500 hover:bg-yellow-600',
  completed: 'bg-blue-500 hover:bg-blue-600',
  expired: 'bg-gray-500 hover:bg-gray-600'
};

export default function CustomerOrderCardDetails({ requestId }: { requestId: string }) {
  const isMobile = useIsMobile();
  const { data, isLoading, error } = useOrder(requestId);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (error || !data) {
    return <div>Request not found</div>;
  }

  return isMobile ? <MobileOrderView data={data} /> : <DesktopOrderView data={data} />;
}
