'use client';

import { type CreateOrderFormSchema } from '@/components/NewRequestForm/NewRequestForm.utils';
import type { Feature } from '@/lib/types';
import { createContext, useContext, useMemo, useState } from 'react';

type DatasetRequestContextType = {
  formData: Partial<CreateOrderFormSchema>;
  updateFormData: (data: Partial<CreateOrderFormSchema>) => void;
  features: Feature[];
  addFeature: (feature: Feature) => void;
  removeFeature: (id: string) => void;
  resetState: () => void;
};

const DatasetRequestContext = createContext<DatasetRequestContextType | undefined>(undefined);

export function DatasetRequestProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<Partial<CreateOrderFormSchema>>({});
  const [features, setFeatures] = useState<Feature[]>([]);

  const updateFormData = (data: Partial<CreateOrderFormSchema>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const addFeature = (feature: Feature) => {
    setFeatures((prev) => [...prev, { ...feature, id: crypto.randomUUID()}]);
  };

  const removeFeature = (id: string) => {
    setFeatures((prev) => prev.filter((f) => f.id !== id));
  };

  const resetState = () => {
    setFormData({});
    setFeatures([]);
  };

  const value = useMemo(() => ({
    formData,
    updateFormData,
    features,
    addFeature,
    removeFeature,
    resetState,
  }), [formData, features, updateFormData, addFeature, removeFeature, resetState]);

  return (
    <DatasetRequestContext.Provider
      value={value}
    >
      {children}
    </DatasetRequestContext.Provider>
  );
}

export function useDatasetRequest() {
  const context = useContext(DatasetRequestContext);
  if (!context) {
    throw new Error('useDatasetRequest must be used within a DatasetRequestProvider');
  }
  return context;
}
