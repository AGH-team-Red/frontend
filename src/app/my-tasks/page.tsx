import { IconTooltip } from "@/components/IconTooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockedRequests, mockedTasks } from "@/lib/mock";
import { format } from "date-fns";
import { Citrus } from "lucide-react";
import Link from "next/link";

export default function Tasks() {
  const tasks = mockedTasks;
  const requestsMap = mockedRequests.reduce(
    (acc, request) => {
      acc[request.id] = request;
      return acc;
    },
    {} as Record<string, (typeof mockedRequests)[0]>,
  );

  return (
    <div className="space-y-3 p-4">
      {tasks.map((task) => (
        <Link key={task.id} href={`/my-tasks/${task.id}`} className="block">
          <Card className="py-3">
            <CardContent className="flex px-3 text-xs">
              <div className="flex flex-col gap-2">
                <h2 className="text-base font-medium">
                  {requestsMap[task.requestId]?.name}
                </h2>
                <div className="flex items-center gap-2">
                  <IconTooltip text="Dummy text">
                    <Citrus size={16} />
                  </IconTooltip>
                  Type: {task.type}
                </div>
                <div className="flex items-center gap-2">
                  <IconTooltip text="Dummy text">
                    <Citrus size={16} />
                  </IconTooltip>
                  Deadline: {format(task.deadline, "P")}
                </div>
                <div className="flex items-center gap-2">
                  <IconTooltip text="Dummy text">
                    <Citrus size={16} />
                  </IconTooltip>
                  Estimated Reward: ~
                  {(
                    requestsMap[task.requestId].budget /
                    requestsMap[task.requestId].contributors /
                    20
                  ).toPrecision(2)}{" "}
                  SOL
                </div>
              </div>
              <div className="flex flex-1 items-center justify-end">
                <Button>Solve</Button>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
