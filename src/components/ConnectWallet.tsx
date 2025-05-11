'use client';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/api/use-auth';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useCallback } from 'react';

const ConnectWallet = (): React.ReactNode => {
  const { publicKey, signMessage, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const { nonceQuery, verifyMutation } = useAuth(publicKey);

  const handleSignIn = useCallback(async () => {
    if (!publicKey || !connected) {
      setVisible(true);

      return;
    }

    if (!signMessage) {
      console.error('Wallet does not support message signing');
      return;
    }

    try {
      const { data: nonce } = await nonceQuery.refetch();

      if (!nonce) {
        console.log('Could not fetch nonce');
      }

      const message = new TextEncoder().encode(String(nonce));
      const signatureBytes = await signMessage(message);
      const signature = Buffer.from(signatureBytes).toString('base64');

      verifyMutation.mutate({ publicKey: publicKey.toString(), signature });
    } catch (err) {
      console.error('Sign-in error:', err);
    }
  }, [publicKey, connected, signMessage, nonceQuery, verifyMutation, setVisible]);

  return (
    <div>
      <WalletMultiButton />

      {connected && (
        <Button
          onClick={handleSignIn}
          disabled={nonceQuery.isFetching || verifyMutation.isPending}
          style={{ marginLeft: 12 }}
        >
          Sign In
        </Button>
      )}
    </div>
  );
};

export { ConnectWallet };
