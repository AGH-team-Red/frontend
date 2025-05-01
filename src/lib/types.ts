export type RequestStatus = "Active" | "Pending" | "Completed" | "Expired";

export type Request = {
  id: string;
  name: string;
  datasetDesc: string;
  status: RequestStatus;
  startDate: Date;
  dueDate: Date;
  samplesCurrent: number;
  samplesTotal: number;
  budget: number;
  language: string;
  features: Feature[];
};

type FeatureType = "Description" | "something";

export type Feature = {
  name: string;
  labelGuidelines: string;
  type: FeatureType;
};
