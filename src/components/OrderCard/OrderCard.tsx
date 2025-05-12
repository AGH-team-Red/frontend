'use-client';

import ProgressCircle from '@/components/ProgressCircle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { TCardDetails, RequestedCardProps } from './types';
import { createClientDetails } from './client-details';
import { createUserDetails } from './user-details';
import { STATUS_COLORS } from '@/lib/utils';

const OrderCard = ({ order, userType, onClickRoute }: RequestedCardProps): React.ReactNode => {
  const { currentSamplesCount, minSamplesCount, name, id, reward, status } = order;

  const isUser = userType === 'user';

  const userDetails = createUserDetails({ userType, order });
  const clientDetails = createClientDetails({ userType, order });

  const renderDetails = (detailsData: TCardDetails[], isUser: boolean) => {
    return (
      <div className="flex flex-1 flex-col space-y-2 text-xs md:text-base">
        {!!!isUser ? (
          <div className="flex items-center justify-between">
            <p>{name}</p>
            <Badge className={STATUS_COLORS[status.toLowerCase()]}>{status}</Badge>
          </div>
        ) : (
          <p>{name}</p>
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
    <Link key={id} href={`/${onClickRoute}/${id}`} className="block w-full min-w-[22rem] xl:min-w-[24rem]">
      <Card className="py-3">
        <CardContent className="flex gap-4 px-3">
          <div className="flex items-center">
            <ProgressCircle current={currentSamplesCount} total={minSamplesCount} />
          </div>
          {renderDetails(isUser ? userDetails : clientDetails, isUser)}
          {isUser && (
            <div className="flex flex-col justify-between">
              <div className="flex flex-col items-center">
                <p className="text-sm md:text-base">Reward</p>
                <p className="font-medium">{`${reward} SOL`}</p>
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
