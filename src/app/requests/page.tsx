"use client";
import RequestCard from "@/components/RequestCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { RequestStatus } from "@/lib/types";
import Link from "next/link";
import { useState } from "react";

import { mockedRequests } from "@/lib/mock";

type RequestStatusFilter = RequestStatus | "All";

const FILTER_OPTIONS: RequestStatusFilter[] = [
  "All",
  "Active",
  "Pending",
  "Completed",
  "Expired",
];

export default function Requests() {
  const [activeFilter, setActiveFilter] = useState<RequestStatusFilter>("All");

  const requests = mockedRequests.filter(
    (request) => activeFilter === "All" || request.status === activeFilter,
  );

  return (
    <div className="space-y-4 p-4">
      <Link href="/requests/new" className="block">
        <Button>New request</Button>
      </Link>

      <div className="bg-card flex justify-evenly border p-2">
        {FILTER_OPTIONS.map((filter) => (
          <Badge
            key={filter}
            className="cursor-pointer"
            variant={activeFilter === filter ? "default" : "secondary"}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </Badge>
        ))}
      </div>

      {requests.map((request) => (
        <RequestCard
          key={request.name}
          userType="client"
          id={request.id}
          name={request.name}
          dueDate={request.dueDate}
          samplesCurrent={request.samplesCurrent}
          samplesTotal={request.samplesTotal}
          status={request.status}
          onClickRoute="requests"
        />
      ))}
    </div>
  );
}
