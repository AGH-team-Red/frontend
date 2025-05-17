'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchTask } from '@/api/tasks';
import { Task } from '@/lib/types';

const useTask = (taskId: string) => {
  const { data, error, isLoading } = useQuery<Task>({
    queryFn: async () => await fetchTask(taskId),
    queryKey: ['task', taskId]
  });

  return {
    data,
    error,
    isLoading
  };
};

export { useTask };
