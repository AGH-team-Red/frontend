import { DatasetRequestProvider } from '@/context/DatasetRequestContext';

export default function RequestFormLayout({ children }: { children: React.ReactNode }) {
  return <DatasetRequestProvider>{children}</DatasetRequestProvider>;
}
