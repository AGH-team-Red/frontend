import type { Request } from "./types";

export const mockedRequests: Request[] = [
  {
    id: "1",
    name: "Dummy Name",
    datasetDesc:
      "some long dataset description that no one will read and care about",
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
        labelGuidelines: "label guidelines",
        type: "Description",
      },
      {
        name: "Feature 2",
        labelGuidelines: "label guidelines",
        type: "Description",
      },
    ],
  },
  {
    id: "2",
    name: "Dummy Name2",
    datasetDesc:
      "some long dataset description that no one will read and care about",
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
    datasetDesc:
      "some long dataset description that no one will read and care about",
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
        labelGuidelines: "label guidelines",
        type: "Description",
      },
      {
        name: "Feature 2",
        labelGuidelines: "label guidelines",
        type: "Description",
      },
      {
        name: "Feature 3",
        labelGuidelines: "label guidelines",
        type: "Description",
      },
    ],
  },
];
