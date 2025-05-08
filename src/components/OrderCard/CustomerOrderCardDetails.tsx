'use client';

import ExampleImageDialog from '@/components/ExampleImageDialog';
import { Card, CardContent } from '@/components/ui/card';
import { Citrus } from 'lucide-react';
import DetailsHeader from '@/components/DetailsHeader';
import { useOrder } from '@/hooks/api/use-order';

const STATUS_DISPLAY: Record<string, string> = {
  active: 'ACT',
  pending: 'PEN',
  completed: 'CMP',
  expired: 'EXP'
};

export default function Page({ requestId }: { requestId: string }): React.ReactNode {
  const { data, isLoading, error } = useOrder(requestId);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (error || !data) {
    return <div>Request not found</div>;
  }

  const REQUEST_HEADER_DATA = [
    {
      label: 'Samples',
      value: `${data.currentSamplesCount ?? '0'}/${data.minSamplesCount ?? '0'}`
    },
    {
      label: 'Budget',
      value: `${data.budget ?? '0'} SOL`
    },
    {
      label: 'Status',
      value: `${STATUS_DISPLAY[data.status ?? 0]}`
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

      <Card className="p-0">
        <CardContent className="space-y-2.5 p-3 text-xs">
          <h2>Order parameters</h2>
          <div className="flex items-center gap-2">
            <Citrus size={16} />
            Order duration: {new Date(`${data.startDate}`).toLocaleDateString('en-GB')}
            {' - '}
            {new Date(`${data.endDate}`).toLocaleDateString('en-GB')}
          </div>
          <div className="flex items-center gap-2">
            <Citrus size={16} />
            Budget {data.budget} SOL
          </div>
          <div className="flex items-center gap-2">
            <Citrus size={16} />
            Label language: {data.labelingLanguage}
          </div>
        </CardContent>
      </Card>

      <Card className="p-0">
        <CardContent className="space-y-2.5 p-3 text-xs">
          <div className="flex items-center justify-between">
            <h2>Dataset image details</h2>
            {data?.features && (
              <ExampleImageDialog image="https://picsum.photos/300/200?random=1" features={data.features} />
            )}
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
          {data.features &&
            data.features.map((feature) => (
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
