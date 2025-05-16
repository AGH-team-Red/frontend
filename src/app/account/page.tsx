import WalletCard from '@/components/WalletCard/WalletCard';

export default function AccountPage() {
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
