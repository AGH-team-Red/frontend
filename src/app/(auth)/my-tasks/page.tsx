'use client';

import { useTasks } from '@/hooks/api/use-tasks';
import TaskListItem from '@/components/TaskListItem';

export default function Tasks() {
  const { data, isLoading, error } = useTasks();

  console.log('tasks LIST', data);

  if (error || !data) {
    return <div>Could not load tasks</div>;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="space-y-3 p-4">
      {data.map((task) => (
        <TaskListItem key={task.id} task={task} />
      ))}
    </div>
  );
}
