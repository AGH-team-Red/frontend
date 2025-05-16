'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Users, Languages, HandCoins, LayoutList } from 'lucide-react';
import DetailsCard from '@/components/DetailsCard';
import DetailsHeader from '@/components/DetailsHeader';
import ExampleImageCarousel from '@/components/ExampleImageCarousel';
import { Button } from '@/components/ui/button';
import { useBreadcrumb } from '@/context/BreadcrumbContext';
import { useOrder } from '@/hooks/api/use-order';
import { useEffect } from 'react';

export default function ({ requestId }: { requestId: string }): React.ReactNode {
  const { setOrderName } = useBreadcrumb();
  const { data, error, isLoading } = useOrder(requestId);

  useEffect(() => {
    if (data?.name) {
      setOrderName(data.name);
    }

    return () => {
      setOrderName(null);
    };
  }, [data?.name, setOrderName]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Request not found</div>;
  }

  const REQUEST_HEADER_DATA = [
    {
      label: 'Reward',
      value: `~${data.reward} SOL`
    },
    {
      label: 'Deadline',
      value: new Date(`${data.endDate}`)
        ? new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
            // @ts-ignore
          }).format(new Date(`${data.endDate}`))
        : ''
    }
  ];

  const REQUEST_DETAILS_DATA = [
    {
      icon: Calendar,
      label: 'Request duration: ',
      // @ts-ignore
      value: `${new Date(`${data.startDate}`).toLocaleDateString('en-GB') ?? ''}-${new Date(`${data.endDate}`).toLocaleDateString('en-GB') ?? ''}`
    },
    {
      icon: HandCoins,
      label: 'Entry fee: ',
      value: `${data.entryFee ?? 0} SOL`
    },
    {
      icon: Users,
      label: 'Contributors: ',
      value: `${data.contributors ?? 0}/${data.minContributors ?? 0}`
    },
    {
      icon: LayoutList,
      label: 'Estimated tasks amount: ',
      value: '20'
    },
    {
      icon: Languages,
      label: 'Label language: ',
      value: data.labelingLanguage ?? 'English'
    }
  ];

  return (
    <div className="space-y-3 p-4">
      <h1 className="text-2xl">{data.name}</h1>
      <DetailsHeader
        datasetName={data.name}
        requestDescrption={data.datasetDescription}
        progressCircleData={{
          samplesCurrent: data.currentSamplesCount,
          samplesTotal: data.minSamplesCount
        }}
        requestHeaderData={REQUEST_HEADER_DATA}
      />
      <DetailsCard header="Request details" detailsData={REQUEST_DETAILS_DATA} />
      <Card className="p-6">
        <CardContent className="flex flex-col gap-3 p-0">
          <h2 className="font-medium">Example task solution</h2>
          <ExampleImageCarousel features={data?.features ?? []} image="https://picsum.photos/300/200?random=1" />
        </CardContent>
      </Card>
      <Button className="fixed bottom-3 left-1/2 w-[80%] -translate-x-1/2">Join</Button>
    </div>
  );
}
