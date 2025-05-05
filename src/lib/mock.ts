import type { Order, Task } from './types';

export const mockedRequests: Order[] = [
  {
    id: '1',
    name: 'Dummy Name',
    dataset: {
      id: '1',
      name: 'Dummy Dataset',
      description: 'some long dataset description that no one will read and care about',
      minSamplesCount: 0,
      samplesCount: 0,
      samplesCurrent: 0,
      features: []
    },
    status: 'Active',
    startDate: new Date('07-01-2024'),
    endDate: new Date('07-24-2024'),
    samplesCurrent: 32,
    samplesCount: 100,
    budget: 2,
    entryFee: 0.03,
    language: 'English',
    minContributors: 20,
    contributors: 10,
    reward: 0.3
  },
  {
    id: '2',
    name: 'Dummy Name2',
    dataset: {
      id: '1',
      name: 'Dummy Dataset',
      description: 'some long dataset description that no one will read and care about',
      minSamplesCount: 0,
      samplesCount: 0,
      samplesCurrent: 0,
      features: []
    },
    status: 'Pending',
    budget: 1,
    startDate: new Date('07-01-2024'),
    endDate: new Date('07-24-2024'),
    samplesCurrent: 0,
    samplesCount: 0,
    language: 'English',
    entryFee: 0.04,
    minContributors: 60,
    contributors: 40,
    reward: 0.2
  },
  {
    id: '3',
    name: 'Dummy Name3',
    dataset: {
      id: '1',
      name: 'Dummy Dataset',
      description: 'some long dataset description that no one will read and care about',
      minSamplesCount: 0,
      samplesCount: 0,
      samplesCurrent: 0,
      features: [
        {
          id: '1',
          name: 'Feature 1',
          description: 'some long dataset description that no one will read and care about',
          imageGuidelines: 'image guidelines',
          labelGuidelines: 'label guidelines',
          type: 'Description',
          datasetId: '1',
          examples: [
            {
              id: '1',
              imageUrl: 'https://example.com/image1.jpg',
              label: 'Label 1',
              featureId: '1'
            },
            {
              id: '2',
              imageUrl: 'https://example.com/image2.jpg',
              label: 'Label 2',
              featureId: '1'
            }
          ]
        },
        {
          id: '2',
          name: 'Feature 2',
          description: 'some long dataset description that no one will read and care about',
          imageGuidelines: 'image guidelines',
          labelGuidelines: 'label guidelines',
          type: 'Description',
          datasetId: '1',
          examples: [
            {
              id: '1',
              imageUrl: 'https://example.com/image3.jpg',
              label: 'Label 3',
              featureId: '2'
            },
            {
              id: '2',
              imageUrl: 'https://example.com/image4.jpg',
              label: 'Label 4',
              featureId: '2'
            }
          ]
        },
        {
          id: '3',
          name: 'Feature 3',
          description: 'some long dataset description that no one will read and care about',
          imageGuidelines: 'image guidelines',
          labelGuidelines: 'label guidelines',
          type: 'Description',
          datasetId: '1',
          examples: [
            {
              id: '1',
              imageUrl: 'https://example.com/image5.jpg',
              label: 'Label 5',
              featureId: '3'
            },
            {
              id: '2',
              imageUrl: 'https://example.com/image6.jpg',
              label: 'Label 6',
              featureId: '3'
            }
          ]
        }
      ]
    },
    status: 'Completed',
    budget: 3,
    startDate: new Date('07-01-2024'),
    endDate: new Date('07-24-2024'),
    samplesCurrent: 100,
    samplesCount: 100,
    language: 'English',
    entryFee: 0.05,
    minContributors: 30,
    contributors: 5,
    reward: 0.1
  }
];

export const mockedTasks: Task[] = [
  {
    id: '1',
    type: 'taking picture',
    deadline: new Date('07-01-2024'),
    requestId: '1'
  },
  {
    id: '2',
    type: 'cross check',
    deadline: new Date('07-15-2024'),
    requestId: '1'
  },
  {
    id: '3',
    type: 'labeling',
    deadline: new Date('07-20-2024'),
    requestId: '1'
  }
];
