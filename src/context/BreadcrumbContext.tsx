'use client';

import { createContext, useContext, useState } from 'react';

const BreadcrumbContext = createContext<{
  orderName: string | null;
  setOrderName: (name: string | null) => void;
}>({
  orderName: null,
  setOrderName: () => {}
});

export function BreadcrumbProvider({ children }: { children: React.ReactNode }) {
  const [orderName, setOrderName] = useState<string | null>(null);

  return <BreadcrumbContext.Provider value={{ orderName, setOrderName }}>{children}</BreadcrumbContext.Provider>;
}

export const useBreadcrumb = () => useContext(BreadcrumbContext);
