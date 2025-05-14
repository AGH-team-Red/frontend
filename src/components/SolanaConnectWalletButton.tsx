'use client';

import { WalletName } from '@solana/wallet-adapter-base';
import { useState } from 'react';
import { useWalletMultiButton } from '@solana/wallet-adapter-base-ui';
import { Wallet } from '@solana/wallet-adapter-react';

const SolanaConnectWalletButton = () => {
  const [walletModalConfig, setWalletModalConfig] = useState<Readonly<{
    onSelectWallet(walletName: WalletName): void;
    wallets: Wallet[];
  }> | null>(null);
  const { buttonState, onConnect, onDisconnect, onSelectWallet } = useWalletMultiButton({
    onSelectWallet: setWalletModalConfig
  });
  let label;
  switch (buttonState) {
    case 'connected':
      label = 'Disconnect';
      break;
    case 'connecting':
      label = 'Connecting';
      break;
    case 'disconnecting':
      label = 'Disconnecting';
      break;
    case 'has-wallet':
      label = 'Connect';
      break;
    case 'no-wallet':
      label = 'Select Wallet';
      break;
  }
  return (
    <>
      <button
        disabled={buttonState === 'connecting' || buttonState === 'disconnecting'}
        onClick={() => {
          switch (buttonState) {
            case 'connected':
              onDisconnect?.();
              break;
            case 'connecting':
            case 'disconnecting':
              break;
            case 'has-wallet':
              onConnect?.();
              break;
            case 'no-wallet':
              onSelectWallet?.();
              break;
          }
        }}
      >
        {label}
      </button>
      {walletModalConfig ? (
        <div>
          {walletModalConfig.wallets.map((wallet) => (
            <button
              key={wallet.adapter.name}
              onClick={() => {
                walletModalConfig.onSelectWallet(wallet.adapter.name);
                setWalletModalConfig(null);
              }}
            >
              {wallet.adapter.name}
            </button>
          ))}
        </div>
      ) : null}
    </>
  );
};

export { SolanaConnectWalletButton };
