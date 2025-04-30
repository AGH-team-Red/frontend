import type { Request } from "./types";

export const mockedRequests: Request[] = [
  {
    id: "1",
    name: "Dummy Name",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    datasetName: "Dummy Dataset",
    status: "Active",
    budget: 2,
    startDate: new Date("07-01-2024"),
    dueDate: new Date("07-24-2024"),
    samplesCurrent: 32,
    samplesTotal: 100,
    language: "English",
    features: [
      {
        name: "Feature 1",
        desc: "Description of feature 1",
        guidelines: {
          image: "image guidelines",
          label: "label guidelines",
        },
        type: "Description",
        exampleFeatures: [
          {
            image: "https://picsum.photos/300/200?random=1",
            label: "Label 1",
          },
          {
            image: "https://picsum.photos/300/200?random=2",
            label: "Label 2",
          },
        ],
      },
      {
        name: "Feature 2",
        desc: "Description of feature 2",
        guidelines: {
          image: "image guidelines",
          label: "label guidelines",
        },
        type: "Description",
        exampleFeatures: [
          {
            image: "https://picsum.photos/300/200?random=3",
            label: "Label 3",
          },
          {
            image: "https://picsum.photos/300/200?random=4",
            label: "Label 4",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Dummy Name2",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    datasetName: "Dummy Dataset",
    status: "Pending",
    budget: 1,
    startDate: new Date("07-01-2024"),
    dueDate: new Date("07-24-2024"),
    samplesCurrent: 0,
    samplesTotal: 0,
    language: "English",
    features: [],
  },
  {
    id: "3",
    name: "Dummy Name3",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    datasetName: "Dummy Dataset",
    status: "Completed",
    budget: 3,
    startDate: new Date("07-01-2024"),
    dueDate: new Date("07-24-2024"),
    samplesCurrent: 100,
    samplesTotal: 100,
    language: "English",
    features: [
      {
        name: "Feature 1",
        desc: "Description of feature 1",
        guidelines: {
          image: "image guidelines",
          label: "label guidelines",
        },
        type: "Description",
        exampleFeatures: [
          {
            image: "https://picsum.photos/300/200?random=5",
            label: "Label 1",
          },
          {
            image: "https://picsum.photos/300/200?random=6",
            label: "Label 2",
          },
        ],
      },
      {
        name: "Feature 2",
        desc: "Description of feature 2",
        guidelines: {
          image: "image guidelines",
          label: "label guidelines",
        },
        type: "Description",
        exampleFeatures: [],
      },
      {
        name: "Feature 3",
        desc: "Description of feature 3",
        guidelines: {
          image: "image guidelines",
          label: "label guidelines",
        },
        type: "Description",
        exampleFeatures: [
          {
            image: "https://picsum.photos/300/200?random=7",
            label: "Label 3",
          },
          {
            image: "https://picsum.photos/300/200?random=8",
            label: "Label 4",
          },
        ],
      },
    ],
  },
];
