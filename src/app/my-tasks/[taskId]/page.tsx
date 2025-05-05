import { mockedRequests, mockedTasks } from "@/lib/mock";
import CrossCheckTask from "./CrossCheckTask";
import LabelingTask from "./LabelingTask";
import TakingPictureTask from "./TakingPictureTask";

export default async function SingleTask({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = await params;

  const task = mockedTasks.find((task) => task.id === taskId);

  if (!task) {
    return <div></div>;
  }

  const request = mockedRequests.find(
    (request) => request.id === task.requestId,
  );

  return (
    <div className="space-y-3 p-4">
      <h1 className="text-2xl">{request?.name}</h1>
      <p className="text-xs">{request?.datasetDesc}</p>
      {task.type === "taking picture" ? (
        <TakingPictureTask
          imageGuidelines={request?.features[0].labelImage || ""}
        />
      ) : task.type === "labeling" ? (
        <LabelingTask
          labelGuidelines={request?.features[0].labelGuidelines || ""}
        />
      ) : (
        <CrossCheckTask userLabel="abcabcabacbacbabcbabcdbasbcdbsacsd" />
      )}
    </div>
  );
}
