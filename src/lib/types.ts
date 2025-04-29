export type RequestStatus = "Active" | "Pending" | "Completed" | "Expired";

export type Request = {
  name: string;
  status: RequestStatus;
  startDate: Date;
  dueDate: Date;
  samplesCurrent: number;
  samplesTotal: number;
  budget: number;
  language: string;
  features: Feature[];
};

type Feature = {
  // TODO
  name: string;
  desc: string;
};
