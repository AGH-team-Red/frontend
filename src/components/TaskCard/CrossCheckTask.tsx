import { IconTooltip } from '@/components/IconTooltip';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Citrus } from 'lucide-react';
import Image from 'next/image';
import { CheckTask } from '@/lib/types';
import { useEffect, useState } from 'react';

type CrossCheckResponse = Record<number, boolean>;

export default function CrossCheckTask({ checkTask }: { checkTask?: CheckTask }) {
  if (!checkTask) {
    return <div>Could not load check task</div>;
  }

  const [isCompleted, setIsCompleted] = useState(false);
  const [taskNumber, setTaskNumber] = useState(0);
  const [results, setResults] = useState<CrossCheckResponse>(() =>
    Object.fromEntries(checkTask.checkFeatures.map((_, index) => [index, false]))
  );

  const handleResult = (result: boolean) => {
    setResults((prev) => ({
      ...prev,
      [taskNumber]: result
    }));

    if (taskNumber < checkTask.checkFeatures.length - 1) {
      setTaskNumber((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  useEffect(() => {
    console.log('Results:', results);
  }, [isCompleted]);

  return (
    <>
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={'https://picsum.photos/350/160'}
          className="rounded-md object-cover"
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          alt="Example image"
        />
        {'TODO Get image from order '}
      </div>
      <div className="flex items-center gap-2">
        <IconTooltip text="Dummy text">
          <Citrus size={16} />
        </IconTooltip>
        {checkTask.checkFeatures[taskNumber].label}
      </div>
      <Card className="py-3">
        <CardContent className="flex flex-col space-y-2 px-3 text-xs">
          <p>{checkTask.checkFeatures[taskNumber].label}</p>
        </CardContent>
      </Card>
      <div className="flex items-center justify-between">
        <Button onClick={() => handleResult(false)}>Incorrect</Button>
        <Button onClick={() => handleResult(true)}>Correct</Button>
      </div>
    </>
  );
}
