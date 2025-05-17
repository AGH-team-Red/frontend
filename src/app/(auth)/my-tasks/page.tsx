'use client';

import { useTasks } from '@/hooks/api/use-tasks';
import TaskListItem from '@/components/TaskListItem';

export default function Tasks() {
  const { data, isLoading, error } = useTasks();

  if (error || !data) {
    return <div>Could not load tasks</div>;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((task) => (
        <TaskListItem key={task.id} task={task} />
      ))}
    </div>
  );
}
