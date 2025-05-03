import DetailsHeader from "@/components/DetailsHeader";
import { mockedRequests } from "@/lib/mock";

export default async function ({
  params,
}: {
  params: Promise<{ requestId: string }>;
}) {
  const { requestId } = await params;

  const request = mockedRequests.find((request) => request.id === requestId);

  const REQUEST_HEADER_DATA = [
    {
      label: "Reward",
      value: `~${request?.reward ?? ""} SOL`,
    },
    {
      label: "Deadilne",
      value: request?.dueDate
        ? new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          }).format(request.dueDate)
        : "",
    },
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
          samplesTotal: request.samplesTotal,
        }}
        requestHeaderData={REQUEST_HEADER_DATA}
      />
    </div>
  );
}
