export const OrderStatuses = {
  active: 'Active',
  pending: 'Pending',
  completed: 'Completed',
  expired: 'Expired'
} as const;

export type OrderStatus = (typeof OrderStatuses)[keyof typeof OrderStatuses];

type FeatureType = 'Description' | 'something';

interface FeatureExample {
  id: string;
  imageUrl: string;
  label: string;
  featureId: string;
}

interface Feature {
  id: string;
  name: string;
  description: string;
  imageGuidelines: string;
  labelGuidelines: string;
  type: FeatureType;
  datasetId: string;
  examples: FeatureExample[];
}

interface Dataset {
  id: string;
  name: string;
  description: string;
  minSamplesCount: number;
  samplesCount: number;
  samplesCurrent: number;
  features: Feature[];
}

export type Order = {
  id: string;
  name: string;
  dataset: Dataset;
  status: OrderStatus;
  startDate: Date;
  endDate: Date;
  samplesCurrent: number;
  samplesCount: number;
  budget: number;
  language: string;
  entryFee: number;
  minContributors: number;
  contributors: number;
  reward: number;
};

type TaskType = 'taking picture' | 'labeling' | 'cross check';

export type Task = {
  id: string;
  type: TaskType;
  deadline: Date;
  requestId: string;
};
