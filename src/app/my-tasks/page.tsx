'use client';

import { IconTooltip } from '@/components/IconTooltip';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { Citrus } from 'lucide-react';
import Link from 'next/link';
import { useTasks } from '@/hooks/api/use-tasks';

export default function Tasks() {
  const { data, isLoading, error } = useTasks();

  if (error || !data) {
    return <div>Could not load tasks</div>;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="space-y-3 p-4">
      {data.map((task) => (
        <Link key={task.id} href={`/my-tasks/${task.id}`} className="block">
          <Card className="py-3">
            <CardContent className="flex px-3 text-xs">
              <div className="flex flex-col gap-2">
                <h2 className="text-base font-medium">{task.id}</h2>
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
                  Deadline: {format(task.endDate, 'P')}
                </div>
                <div className="flex items-center gap-2">
                  <IconTooltip text="Dummy text">
                    <Citrus size={16} />
                  </IconTooltip>
                  Estimated Reward: ~{task.estimatedReward}
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
