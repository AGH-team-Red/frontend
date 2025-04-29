"use client";

import ProgressCircle from "@/components/ProgressCircle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { RequestStatus } from "@/lib/types";
import { Citrus } from "lucide-react";
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
      <Button>New request</Button>

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
        <Link
          key={request.id}
          href={`/requests/${request.id}`}
          className="block"
        >
          <Card className="py-3">
            <CardContent className="flex gap-2 px-3">
              <div className="flex items-center p-4">
                <ProgressCircle
                  current={request.samplesCurrent}
                  total={request.samplesTotal}
                />
              </div>
              <div className="flex flex-1 flex-col space-y-2 text-xs">
                <div className="flex justify-between">
                  {request.name} <Badge>{request.status}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Citrus size={16} />
                  Samples collected: {request.samplesCurrent}/
                  {request.samplesTotal}
                </div>
                <div className="flex items-center gap-2">
                  <Citrus size={16} />
                  Active until: {request.dueDate.toLocaleDateString("en-GB")}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
