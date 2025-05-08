import { SingleTaskCard } from '@/components/TaskCard/SingleTaskCard';

export default async function SingleTask({ params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = await params;

  return <SingleTaskCard taskId={taskId} />;
}
