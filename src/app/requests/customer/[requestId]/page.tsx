import ExampleImageDialog from '@/components/ExampleImageDialog';
import { Card, CardContent } from '@/components/ui/card';
import { Citrus } from 'lucide-react';

import { mockedRequests } from '@/lib/mock';
import DetailsHeader from '@/components/DetailsHeader';

const STATUS_DISPLAY: Record<string, string> = {
  Active: 'ACT',
  Pending: 'PEN',
  Completed: 'CMP',
  Expired: 'EXP'
};

export default async function Page({ params }: { params: Promise<{ requestId: string }> }) {
  const { requestId } = await params;

  const request = mockedRequests.find((request) => request.id === requestId);

  const REQUEST_HEADER_DATA = [
    {
      label: 'Samples',
      value: `${request?.samplesCurrent ?? '0'}/${request?.samplesTotal ?? '0'}`
    },
    {
      label: 'Budget',
      value: `${request?.budget ?? '0'} SOL`
    },
    {
      label: 'Status',
      value: `${STATUS_DISPLAY[request?.status ?? 0]}`
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

      <Card className="p-0">
        <CardContent className="space-y-2.5 p-3 text-xs">
          <h2>Request parameters</h2>
          <div className="flex items-center gap-2">
            <Citrus size={16} />
            Request duration: {request.startDate.toLocaleDateString('en-GB')}
            {' - '}
            {request.dueDate.toLocaleDateString('en-GB')}
          </div>
          <div className="flex items-center gap-2">
            <Citrus size={16} />
            Budget {request.budget} SOL
          </div>
          <div className="flex items-center gap-2">
            <Citrus size={16} />
            Label language: {request.language}
          </div>
        </CardContent>
      </Card>

      <Card className="p-0">
        <CardContent className="space-y-2.5 p-3 text-xs">
          <div className="flex items-center justify-between">
            <h2>Dataset image details</h2>
            <ExampleImageDialog image="https://picsum.photos/300/200?random=1" features={request.features} />
          </div>
          <div className="flex items-center">
            <Citrus size={16} />
            <h1 className="ml-2">Image guidelines:</h1>
            <p>guidelines for users explaining how to take a picture.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="p-0">
        <CardContent className="space-y-2.5 p-3 text-xs">
          <h2>Dataset features</h2>
          {request.features.map((feature) => (
            <Card key={feature.name} className="p-0">
              <CardContent className="p-3">
                <div className="flex flex-col gap-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <h1>{feature.name}</h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <Citrus size={16} />
                    Label guidelines: {feature.labelGuidelines}
                  </div>
                  <div className="flex items-center gap-2">
                    <Citrus size={16} />
                    Type: {feature.type}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
