import type { Request } from "./types";

export const mockedRequests: Request[] = [
  {
    name: "Dummy Name",
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
      },
    ],
  },
  {
    name: "Dummy Name2",
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
    name: "Dummy Name3",
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
      },
      {
        name: "Feature 2",
        desc: "Description of feature 2",
      },
      {
        name: "Feature 3",
        desc: "Description of feature 3",
      },
    ],
  },
];
