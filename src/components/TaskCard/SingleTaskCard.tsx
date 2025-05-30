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
import { Task } from '@/lib/types';

export default function SingleTaskCard({ taskId }: { taskId: string }) {
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
    <div className="mx-auto flex min-h-[calc(100vh_-_var(--header-height))] w-full max-w-[380px] flex-col justify-center space-y-3 p-4 md:mx-0 md:max-w-none md:flex-row md:items-center">
      {isMobile ? (
        <>
          <h1 className="text-2xl font-bold">{order.name}</h1>
          <p className="text-xs">{order.datasetDescription}</p>
          <TaskRenderer task={task} />
        </>
      ) : (
        <Card className="w-full max-w-md text-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{order.name}</CardTitle>
            <CardDescription className="text-gray-400">{order.datasetDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <TaskRenderer task={task} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

const TaskRenderer = ({ task }: { task: Task }) => {
  switch (task.type) {
    case 'taking_picture':
      return <TakingPictureTask pictureTask={task.pictureTask} />;
    case 'labeling':
      return <LabelingTask labelTask={task.labelTask} />;
    default:
      return <CrossCheckTask checkTask={task.checkTask} />;
  }
};
