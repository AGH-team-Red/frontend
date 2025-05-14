'use client';

import CrossCheckTask from '@/components/TaskCard/CrossCheckTask';
import LabelingTask from '@/components/TaskCard/LabelingTask';
import TakingPictureTask from '@/components/TaskCard/TakingPictureTask';
import { useBreadcrumb } from '@/context/BreadcrumbContext';
import { useOrder } from '@/hooks/api/use-order';
import { useTask } from '@/hooks/api/use-task';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

const SingleTaskCard = ({ taskId }: { taskId: string }): React.ReactNode => {
  const { setOrderName } = useBreadcrumb();
  const isMobile = useIsMobile();
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
    <div className="mx-auto flex min-h-[calc(100vh_-_var(--header-height))] max-w-[420px] flex-col justify-center space-y-3 p-4 md:mx-0 md:max-w-none md:flex-row md:items-center">
      {isMobile ? (
        <>
          <h1 className="text-2xl font-bold">{order.name}</h1>
          <p className="text-xs">{order.datasetDescription}</p>
          {task.type === 'taking_picture' ? (
            <TakingPictureTask pictureTask={task.pictureTask} />
          ) : task.type === 'labeling' ? (
            <LabelingTask labelTask={task.labelTask} />
          ) : (
            <CrossCheckTask checkTask={task.checkTask} />
          )}
        </>
      ) : (
        <Card className="w-full max-w-md text-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{order.name}</CardTitle>
            <CardDescription className="text-gray-400">{order.datasetDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {task.type === 'taking_picture' ? (
              <TakingPictureTask pictureTask={task.pictureTask} />
            ) : task.type === 'labeling' ? (
              <LabelingTask labelTask={task.labelTask} />
            ) : (
              <CrossCheckTask checkTask={task.checkTask} />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export { SingleTaskCard };
