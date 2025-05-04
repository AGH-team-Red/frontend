"use client";

import { mockedRequests } from "@/lib/mock";
import RequestCard from "@/components/RequestCard";

export default function Requests() {
  const requests = mockedRequests.filter(
    (request) => request.status == "Active",
  );

  return (
    <div className="space-y-4 p-4">
      {requests.map((request) => (
        <RequestCard
          key={request.name}
          userType="user"
          id={request.id}
          name={request.name}
          dueDate={request.dueDate}
          samplesCurrent={request.samplesCurrent}
          samplesTotal={request.samplesTotal}
          reward={request.reward}
          contributors={request.contributors}
          minContributors={request.contributors}
          entryFee={request.entryFee}
          onClickRoute="user-requests"
        />
      ))}
    </div>
  );
}
