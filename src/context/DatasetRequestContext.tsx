'use client';

import { type CreateOrderFormSchema } from '@/components/NewOrderForm/NewOrderForm.utils';
import type { Feature } from '@/lib/types';
import { createContext, useContext, useMemo, useState } from 'react';
import { ClientUploadedFileData } from 'uploadthing/types';

export type NewFeature = Omit<Feature, 'orderId' | 'id'>;

type DatasetRequestContextType = {
  formData: Partial<CreateOrderFormSchema>;
  updateFormData: (data: Partial<CreateOrderFormSchema>) => void;
  features: NewFeature[];
  addFeature: (feature: NewFeature) => void;
  removeFeature: (id: string) => void;
  resetState: () => void;
  image: ClientUploadedFileData<{
    uploadedBy: string;
  }> | null;
  setImage: (image: ClientUploadedFileData<{ uploadedBy: string }> | null) => void;
};

const DatasetRequestContext = createContext<DatasetRequestContextType | undefined>(undefined);

export function DatasetRequestProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<Partial<CreateOrderFormSchema>>({
    name: '',
    startDate: undefined,
    endDate: undefined,
    budget: undefined,
    labelingLanguage: undefined,
    datasetDescription: '',
    minSamplesCount: undefined,
    imageGuidelines: '',
    exampleImageUrl: ''
  });
  const [image, setImage] = useState<ClientUploadedFileData<{
    uploadedBy: string;
  }> | null>(null);
  const [features, setFeatures] = useState<NewFeature[]>([]);

  const updateFormData = (data: Partial<CreateOrderFormSchema>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const addFeature = (feature: NewFeature) => {
    setFeatures((prev) => [...prev, feature]);
  };

  const removeFeature = (name: string) => {
    setFeatures((prev) => prev.filter((f) => f.name !== name));
  };

  const resetState = () => {
    setFormData({});
    setFeatures([]);
    setImage(null);
  };

  const value = useMemo(
    () => ({
      formData,
      updateFormData,
      features,
      addFeature,
      removeFeature,
      image,
      setImage,
      resetState
    }),
    [formData, features, updateFormData, addFeature, removeFeature, resetState, image, setImage]
  );

  return <DatasetRequestContext.Provider value={value}>{children}</DatasetRequestContext.Provider>;
}

export function useDatasetRequest() {
  const context = useContext(DatasetRequestContext);
  if (!context) {
    throw new Error('useDatasetRequest must be used within a DatasetRequestProvider');
  }
  return context;
}
