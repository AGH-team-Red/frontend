'use client';
import WalletCard from '@/components/WalletCard/WalletCard';
import { useSidebar } from '@/components/ui/sidebar';

export default function AccountPage() {
  const { isMobile } = useSidebar();

  return (
    <div className="bg-background w-full p-4">
      <div className="flex flex-col">
        <WalletCard
          onCancel={() => {
            window.history.back();
          }}
          fullPage={true}
        />
      </div>
    </div>
  );
}
