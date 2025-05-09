import { Order, Task } from '@/lib/types';
import httpClient from '@/lib/http-client';

const fetchTasks = async (): Promise<Array<Task>> => {
  const response = await httpClient.get<Array<Task>>('http://localhost:3001/tasks', {});

  return response;
};

const fetchTask = async (taskId: string): Promise<Task> => {
  const response = await httpClient.get<Task>(`http://localhost:3001/tasks/${taskId}`, {});

  return response;
};

export { fetchTasks, fetchTask };
