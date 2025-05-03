"use client";

import { type RequestFormSchema } from "@/components/NewRequestForm/NewRequestForm.utils";
import type { Feature } from "@/lib/types";
import { createContext, useContext, useState } from "react";

type DatasetRequestContextType = {
  formData: Partial<RequestFormSchema>;
  updateFormData: (data: Partial<RequestFormSchema>) => void;
  features: Feature[];
  addFeature: (feature: Omit<Feature, "id">) => void;
  removeFeature: (id: string) => void;
  resetState: () => void;
};

const DatasetRequestContext = createContext<
  DatasetRequestContextType | undefined
>(undefined);

export function DatasetRequestProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [formData, setFormData] = useState<Partial<RequestFormSchema>>({});
  const [features, setFeatures] = useState<Feature[]>([]);

  const updateFormData = (data: Partial<RequestFormSchema>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const addFeature = (feature: Omit<Feature, "id">) => {
    setFeatures((prev) => [...prev, { ...feature, id: crypto.randomUUID() }]);
  };

  const removeFeature = (id: string) => {
    setFeatures((prev) => prev.filter((f) => f.id !== id));
  };

  const resetState = () => {
    setFormData({});
    setFeatures([]);
  };

  return (
    <DatasetRequestContext.Provider
      value={{
        formData,
        updateFormData,
        features,
        addFeature,
        removeFeature,
        resetState,
      }}
    >
      {children}
    </DatasetRequestContext.Provider>
  );
}

export function useDatasetRequest() {
  const context = useContext(DatasetRequestContext);
  if (!context) {
    throw new Error(
      "useDatasetRequest must be used within a DatasetRequestProvider",
    );
  }
  return context;
}
