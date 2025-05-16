'use client';

import ExampleImageDialog from '@/components/ExampleImageDialog';
import ProgressCircle from '@/components/ProgressCircle';
import { Card, CardContent } from '@/components/ui/card';
import type { Order } from '@/lib/types';
import { Calendar, CircleDollarSign, Languages, RulerDimensionLine } from 'lucide-react';
import { STATUS_DISPLAY } from '@/lib/utils';

export default function MobileOrderView({ data }: { data: Order }) {
  const requestHeaderData = [
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
      value: `${STATUS_DISPLAY[data.status]}`
    }
  ];

  return (
    <div className="space-y-3 p-4">
      <h1 className="text-2xl">{data.name}</h1>
      <Card className="p-6">
        <CardContent className="flex flex-col gap-3 p-0">
          <div className="flex gap-2">
            <div className="flex items-center pr-4">
              <ProgressCircle current={data.currentSamplesCount} total={data.minSamplesCount} />
            </div>
            <div className="flex flex-1 flex-col space-y-2">
              <h2 className="text-md font-medium">{data.name}</h2>
              <div className="flex gap-3">
                {requestHeaderData.map((item) => (
                  <div key={item.value} className="flex flex-col">
                    <span className="text-xs">{item.label}</span>
                    <span className="text-2xl">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm">{data.datasetDescription}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="p-0">
        <CardContent className="space-y-2.5 p-3 text-xs">
          <h2>Order parameters</h2>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            Order duration: {new Date(`${data.startDate}`).toLocaleDateString('en-GB')}
            {' - '}
            {new Date(`${data.endDate}`).toLocaleDateString('en-GB')}
          </div>
          <div className="flex items-center gap-2">
            <CircleDollarSign size={16} />
            Budget {data.budget} SOL
          </div>
          <div className="flex items-center gap-2">
            <Languages size={16} />
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
            <RulerDimensionLine size={16} />
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
                      <RulerDimensionLine size={16} />
                      Label guidelines: {feature.labelGuidelines}
                    </div>
                    {/* <div className="flex items-center gap-2">
                      <Citrus size={16} />
                      Type: {feature.type}
                    </div> */}
                  </div>
                </CardContent>
              </Card>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
