'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchTasks } from '@/api/tasks';
import { Task } from '@/lib/types';

const useTasks = () => {
  const { error, data, isLoading } = useQuery<Task[]>({
    queryFn: fetchTasks,
    queryKey: ['orders']
  });

  return {
    error,
    data,
    isLoading
  };
};

export { useTasks };
