export const OrderStatuses = {
  active: 'Active',
  pending: 'Pending',
  completed: 'Completed',
  expired: 'Expired'
} as const;

export type OrderStatus = (typeof OrderStatuses)[keyof typeof OrderStatuses];

type FeatureType = 'Description' | 'something';

export interface Feature {
  id: string;
  orderId: string;
  name: string;
  labelGuidelines: string;
}

export interface Order {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: keyof typeof OrderStatuses;
  budget: number;
  labelingLanguage: 'polish' | 'english';
  datasetDescription: string;
  exampleImageUrl: string;
  imageGuidelines: string;
  minSamplesCount: number;
  currentSamplesCount: number;
  entryFee?: number;
  reward?: number;
  minContributors?: number;
  contributors?: number;
  features?: Feature[];
}

export type TaskType = 'labeling' | 'cross_checking' | 'taking_picture';

export interface Task {
  id: string;
  type: TaskType;
  endDate: string;
  estimatedReward: number;
  assignedToId?: string;
  orderId: string;
  labelTask?: LabelTask;
  checkTask?: CheckTask;
  pictureTask?: PictureTask;
}

export interface LabelTask {
  id: string;
  taskId: string;
  featureLabels: FeatureLabel[];
}

export interface FeatureLabel {
  id: string;
  labelTaskId: string;
  featureId: string;
  featureLabel: string;
}

export interface CheckTask {
  id: string;
  taskId: string;
  isCorrect?: boolean;
  checkFeatures: CheckFeature[];
}

export interface CheckFeature {
  id: string;
  checkTaskId: string;
  name: string;
  label: string;
}

export interface PictureTask {
  id: string;
  taskId: string;
  exampleImgUrl?: string;
}
