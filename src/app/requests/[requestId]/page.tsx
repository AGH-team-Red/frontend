import ExampleFeatureDialog from "@/components/ExampleFeatureDialog";
import ProgressCircle from "@/components/ProgressCircle";
import { Card, CardContent } from "@/components/ui/card";
import { Citrus } from "lucide-react";

import { mockedRequests } from "@/lib/mock";

const STATUS_DISPLAY: Record<string, string> = {
  Active: "ACT",
  Pending: "PEN",
  Completed: "CMP",
  Expired: "EXP",
};

export default async function Page({
  params,
}: {
  params: Promise<{ requestId: string }>;
}) {
  const { requestId } = await params;

  const request = mockedRequests.find((request) => request.id === requestId);

  if (!request) {
    return <div>Request not found</div>;
  }

  return (
    <div className="space-y-3 p-4">
      <h1 className="text-2xl">{request.name}</h1>
      <p className="text-sm">{request.desc}</p>
      <Card className="p-6">
        <CardContent className="flex gap-2 p-0">
          <div className="flex items-center pr-4">
            <ProgressCircle
              current={request.samplesCurrent}
              total={request.samplesTotal}
            />
          </div>
          <div className="flex flex-1 flex-col space-y-2">
            <h1 className="text-base">{request.name}</h1>
            <div className="flex justify-between">
              <div>
                <h2 className="text-xs">Samples</h2>
                <p className="text-2xl">
                  {request.samplesCurrent}/{request.samplesTotal}
                </p>
              </div>
              <div>
                <h2 className="text-xs">Budget</h2>
                <p className="text-2xl">{request.budget} SOL</p>
              </div>
              <div>
                <h2 className="text-xs">Status</h2>
                <p className="text-2xl">{STATUS_DISPLAY[request.status]}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="p-0">
        <CardContent className="space-y-2.5 p-3 text-xs">
          <h2>Request parameters</h2>
          <div className="flex items-center gap-2">
            <Citrus size={16} />
            Request duration: {request.startDate.toLocaleDateString("en-GB")}
            {" - "}
            {request.dueDate.toLocaleDateString("en-GB")}
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
          <h2>Dataset features</h2>
          {request.features.map((feature) => (
            <Card key={feature.name} className="p-0">
              <CardContent className="p-3">
                <div className="flex flex-col gap-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <h1>{feature.name}</h1>
                    {feature.exampleFeatures.length > 0 && (
                      <ExampleFeatureDialog
                        exampleFeatures={feature.exampleFeatures}
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Citrus size={16} />
                    Name: {feature.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <Citrus size={16} />
                    Description: {feature.desc}
                  </div>
                  <div className="flex items-center gap-2">
                    <Citrus size={16} />
                    Image guidelines: {feature.guidelines?.image}
                  </div>
                  <div className="flex items-center gap-2">
                    <Citrus size={16} />
                    Label guidelines: {feature.guidelines?.label}
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
