import { IconTooltip } from '@/components/IconTooltip';
import { Skeleton } from '@/components/Skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useOrder } from '@/hooks/api/use-order';
import type { Task } from '@/lib/types';
import { format } from 'date-fns';
import { Clock5, DollarSign, Tag } from 'lucide-react';
import Link from 'next/link';

export default function TaskListItem({ task }: { task: Task }) {
  console.log('task asdklfjaslkdjflaksdjf', task);
  const { isLoading, error, data } = useOrder(task.orderId);

  if (isLoading) {
    return <Skeleton />;
  }

  if (error || !data) {
    return <div>Could not load order</div>;
  }

  return (
    <Link prefetch={false} key={task.id} href={`/my-tasks/${task.id}`} className="block">
      <Card className="py-3">
        <CardContent className="flex gap-4 px-3 text-xs md:flex-col md:px-4 md:py-1 md:text-sm">
          <div className="flex flex-col gap-2 text-zinc-400">
            <h2 className="text-base font-medium text-white md:text-lg">{data.name}</h2>
            <div className="flex items-center gap-2">
              <IconTooltip text="Dummy text">
                <Tag size={16} />
              </IconTooltip>
              Type:{' '}
              {task.type
                .split('_')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </div>
            <div className="flex items-center gap-2">
              <IconTooltip text="Dummy text">
                <Clock5 size={16} />
              </IconTooltip>
              Deadline: {format(task.endDate, 'P')}
            </div>
            <div className="flex items-center gap-2">
              <IconTooltip text="Dummy text">
                <DollarSign size={16} />
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
  );
}
