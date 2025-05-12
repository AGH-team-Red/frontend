'use client';

import { useTask } from '@/hooks/api/use-task';
import TakingPictureTask from '@/components/TaskCard/TakingPictureTask';
import LabelingTask from '@/components/TaskCard/LabelingTask';
import CrossCheckTask from '@/components/TaskCard/CrossCheckTask';
import { useOrder } from '@/hooks/api/use-order';
import { useBreadcrumb } from '@/context/BreadcrumbContext';
import { useEffect } from 'react';

const SingleTaskCard = ({ taskId }: { taskId: string }): React.ReactNode => {
  const { setOrderName } = useBreadcrumb();
  const { data: task, isLoading, error } = useTask(taskId);
  const { data: order, isLoading: isOrderLoading, error: isOrderError } = useOrder(task?.orderId || '');

  useEffect(() => {
    if (order?.name) {
      setOrderName(order.name);
    }

    return () => {
      setOrderName(null);
    };
  }, [order?.name, setOrderName]);

  if (error || !task) {
    return <div>Could not load task of if {taskId}</div>;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isOrderError || !order) {
    return <div>Could not load order of task {taskId}</div>;
  }

  if (isOrderLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-3 p-4 lg:flex lg:min-h-[calc(100vh_-_var(--header-height))] lg:flex-col lg:justify-center">
      <h1 className="text-2xl">{order.name}</h1>
      <p className="text-xs">{order.datasetDescription}</p>
      {task.type === 'taking_picture' ? (
        <TakingPictureTask pictureTask={task.pictureTask} />
      ) : task.type === 'labeling' ? (
        <LabelingTask labelTask={task.labelTask} />
      ) : (
        <CrossCheckTask checkTask={task.checkTask} />
      )}
    </div>
  );
};

export { SingleTaskCard };
