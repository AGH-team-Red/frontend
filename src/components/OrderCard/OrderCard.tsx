'use-client';

import { useOrder } from '@/hooks/api/use-order';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { TCardDetails, OrderCardProps } from './types';
import { createClientDetails } from './client-details';
import { createUserDetails } from './user-details';
import { STATUS_COLORS } from '@/lib/utils';
import Link from 'next/link';
import ProgressCircle from '@/components/ProgressCircle';
import { Button } from '@/components/ui/button';

const OrderCard = ({ orderId, userType, onClickRoute }: OrderCardProps): React.ReactNode => {
  const { data, isLoading, error } = useOrder(orderId);

  if (!data || error) {
    return <div>Could not load order {`${orderId}`}</div>;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const isUser = userType === 'user';

  const userDetails = createUserDetails({ userType, order: data });
  const clientDetails = createClientDetails({ userType, order: data });

  const renderDetails = (detailsData: TCardDetails[], isUser: boolean) => {
    const statusColor = STATUS_COLORS[data.status.toLowerCase()];

    return (
      <div className="flex flex-1 flex-col space-y-2 text-xs md:text-base">
        {!isUser ? (
          <div className="flex items-center justify-between">
            <p>{data.name}</p>
            <Badge className={statusColor}>{data.status}</Badge>
          </div>
        ) : (
          <p>{data.name}</p>
        )}
        {detailsData.map((detail) => (
          <div key={detail.label} className="flex items-center gap-2">
            {detail.icon}
            {detail.label}
            {detail.values}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Link key={data.id} href={`/${onClickRoute}/${data.id}`} className="block w-full min-w-[22rem] xl:min-w-[24rem]">
      <Card className="py-3">
        <CardContent className="flex gap-4 px-3">
          <div className="flex items-center">
            <ProgressCircle current={data.currentSamplesCount} total={data.minSamplesCount} />
          </div>
          {renderDetails(isUser ? userDetails : clientDetails, isUser)}
          {isUser && (
            <div className="flex flex-col justify-between">
              <div className="flex flex-col items-center">
                <p className="text-sm md:text-base">Reward</p>
                <p className="font-medium">{`${data.reward} SOL`}</p>
              </div>
              <Button>Join</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default OrderCard;
