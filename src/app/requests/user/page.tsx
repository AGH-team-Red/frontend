'use client';

import RequestCard from '@/components/RequestCard';
import { useOrders } from '@/hooks/api/use-orders';
import { Skeleton } from '@/components/ui/skeleton';

export default function Requests() {
  const query = useOrders();

  if (query.isLoading) {
    return <Skeleton />;
  }

  if (query.error || !query.data) {
    return <div>Error</div>;
  }

  return (
    <div className="space-y-4 p-4">
      {query.data.map((request) => (
        <RequestCard
          key={request.name}
          userType="user"
          id={request.id}
          name={request.name}
          dueDate={new Date(request.dueDate)}
          samplesCurrent={request.samplesCurrent}
          samplesTotal={request.samplesTotal}
          reward={request.reward}
          contributors={request.contributors}
          minContributors={request.minContributors}
          entryFee={request.entryFee}
          onClickRoute="user-requests"
        />
      ))}
    </div>
  );
}
