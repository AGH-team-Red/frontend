import { cn } from '@/lib/utils';
import { Progress } from '../ui/progress';

export default function TaskProgress({
  className,
  current,
  max
}: {
  className?: string;
  current: number;
  max: number;
}) {
  const progress = Math.round((current / max) * 100);

  return (
    <div className={cn(`w-full space-y-1`, className)}>
      <Progress value={progress} className="h-2 bg-gray-800" />
      <p className="text-center text-xs text-gray-400">
        Task {current + 1} of {max}
      </p>
    </div>
  );
}
