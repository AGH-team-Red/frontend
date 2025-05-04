export type RequestStatus = 'Active' | 'Pending' | 'Completed' | 'Expired';

// interface FeatureExample {
//   id: string;
//   imageUrl: string;
//   label: string;
//   featureId: string;
// }

// interface Feature {
//   id: string;
//   name: string;
//   description: string;
//   imageGuidelines: string;
//   labelGuidelines: string;
//   type: string;
//   datasetId: string;
//   examples: FeatureExample[];
// }

interface Dataset {
  id: string;
  name: string;
  description: string;
  minSamplesCount: number;
  features: Feature[];
}

export interface Order {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  budget: string;
  labelingLanguage: string;
  datasetId: string;
  dataset: Dataset;
  contributors: string[];
}

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

type FeatureType = 'Description' | 'something';

export type Feature = {
  id: string;
  name: string;
  labelGuidelines: string;
  labelImage: string;
  type?: FeatureType;
};
