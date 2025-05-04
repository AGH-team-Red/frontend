import { Card, CardContent } from '@/components/ui/card';
import { Citrus } from 'lucide-react';
import DetailsCard from '@/components/DetailsCard';
import DetailsHeader from '@/components/DetailsHeader';
import { Button } from '@/components/ui/button';
import { mockedRequests } from '@/lib/mock';
import ExampleImageCarousel from '@/components/ExampleImageCarousel';

export default async function ({ params }: { params: Promise<{ requestId: string }> }) {
  const { requestId } = await params;

  const request = mockedRequests.find((request) => request.id === requestId);

  const REQUEST_HEADER_DATA = [
    {
      label: 'Reward',
      value: `~${request?.reward ?? ''} SOL`
    },
    {
      label: 'Deadilne',
      value: request?.dueDate
        ? new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
          }).format(request.dueDate)
        : ''
    }
  ];

  const REQUEST_DETAILS_DATA = [
    {
      icon: Citrus,
      label: 'Request duration: ',
      value: `${request?.startDate.toLocaleDateString('en-GB') ?? ''}-${request?.dueDate.toLocaleDateString('en-GB') ?? ''}`
    },
    {
      icon: Citrus,
      label: 'Entry fee: ',
      value: `${request?.entryFee ?? 0} SOL`
    },
    {
      icon: Citrus,
      label: 'Contributors: ',
      value: `${request?.contributors ?? 0}/${request?.minContributors ?? 0}`
    },
    {
      icon: Citrus,
      label: 'Estimated tasks amount: ',
      value: '20'
    },
    {
      icon: Citrus,
      label: 'Label language: ',
      value: request?.language ?? 'English'
    }
  ];

  if (!request) {
    return <div>Request not found</div>;
  }

  return (
    <div className="space-y-3 p-4">
      <h1 className="text-2xl">{request.name}</h1>
      <DetailsHeader
        datasetName={request.name}
        requestDescrption={request.datasetDesc}
        progressCircleData={{
          samplesCurrent: request.samplesCurrent,
          samplesTotal: request.samplesTotal
        }}
        requestHeaderData={REQUEST_HEADER_DATA}
      />
      <DetailsCard header="Request details" detailsData={REQUEST_DETAILS_DATA} />
      <Card className="p-6">
        <CardContent className="flex flex-col gap-3 p-0">
          <h2 className="font-medium">Example task solution</h2>
          <ExampleImageCarousel features={request?.features ?? []} image="https://picsum.photos/300/200?random=1" />
        </CardContent>
      </Card>
      <Button className="fixed bottom-3 left-1/2 w-[80%] -translate-x-1/2">Join</Button>
    </div>
  );
}
