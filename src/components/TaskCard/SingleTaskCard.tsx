'use client';

import { useTask } from '@/hooks/api/use-task';
import TakingPictureTask from '@/components/TaskCard/TakingPictureTask';
import LabelingTask from '@/components/TaskCard/LabelingTask';
import CrossCheckTask from '@/components/TaskCard/CrossCheckTask';

const SingleTaskCard = ({ taskId }: { taskId: string }): React.ReactNode => {
  const { data, isLoading, error } = useTask(taskId);

  if (error || !data) {
    return <div>Could not load task of if {taskId}</div>;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-3 p-4">
      <h1 className="text-2xl">{data.orderId}</h1>
      <p className="text-xs">{'TODO datasetDescription'}</p>
      {data.type === 'taking_picture' ? (
        <TakingPictureTask pictureTask={data.pictureTask} />
      ) : data.type === 'labeling' ? (
        <LabelingTask labelTask={data.labelTask} />
      ) : (
        <CrossCheckTask checkTask={data.checkTask} />
      )}
    </div>
  );
};

export { SingleTaskCard };
