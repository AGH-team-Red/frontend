'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, Languages, HandCoins, LayoutList } from 'lucide-react';
import DetailsCard from '@/components/DetailsCard';
import DetailsHeader from '@/components/DetailsHeader';
import ExampleImageCarousel from '@/components/ExampleImageCarousel';
import { Button } from '@/components/ui/button';
import { useBreadcrumb } from '@/context/BreadcrumbContext';
import { useOrder } from '@/hooks/api/use-order';
import { useEffect } from 'react';

export default function ClientOrderCardDetails({ orderId }: { orderId: string }) {
  const { setOrderName } = useBreadcrumb();
  const { data, error, isLoading } = useOrder(orderId);

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
      value: `${new Date(`${data.startDate}`).toLocaleDateString('en-GB') ?? ''} - ${new Date(`${data.endDate}`).toLocaleDateString('en-GB') ?? ''}`
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
    <div className="min-h-[calc(100vh_-_var(--header-height))] bg-black text-white">
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h1 className="text-4xl font-bold">{data.name}</h1>
          <Button className="bg-blue-600 px-8 py-6 text-lg text-white hover:bg-blue-700">Join</Button>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <DetailsHeader
              orderDescription={data.datasetDescription}
              progressCircleData={{
                samplesCurrent: data.currentSamplesCount,
                samplesTotal: data.minSamplesCount
              }}
              orderHeaderData={REQUEST_HEADER_DATA}
            />
            <Card className="p-6">
              <CardContent className="flex flex-col gap-3 p-0">
                <CardHeader className="p-0">
                  <CardTitle className="md:text-xl">Example Task Solution</CardTitle>
                </CardHeader>
                <ExampleImageCarousel features={data?.features ?? []} image="https://picsum.photos/300/200?random=1" />
              </CardContent>
            </Card>
          </div>
          <DetailsCard className="w-full place-self-start" header="Order details" detailsData={REQUEST_DETAILS_DATA} />
        </div>
      </main>
    </div>
  );
}
