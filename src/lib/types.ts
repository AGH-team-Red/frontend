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
  entryFee: number;
  minContributors: number;
  contributors: number;
  reward: number;
  features: Feature[];
};

type FeatureType = "Description" | "something";

export type Feature = {
  id: string;
  name: string;
  labelGuidelines: string;
  labelImage: string;
  type?: FeatureType;
};
