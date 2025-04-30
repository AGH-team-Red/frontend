export type RequestStatus = "Active" | "Pending" | "Completed" | "Expired";

export type Request = {
  id: string;
  name: string;
  desc: string;
  datasetName: string;
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

export type ExampleFeature = {
  image: string;
  label: string;
};

type Feature = {
  name: string;
  desc: string;
  guidelines?: {
    image: string;
    label: string;
  };
  type: FeatureType;
  exampleFeatures: ExampleFeature[];
};
