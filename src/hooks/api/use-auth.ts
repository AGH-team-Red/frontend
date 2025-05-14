'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchNonce, verify } from '@/api/auth';
import type { Verification, VerificationResult } from '@/lib/types';
import type { PublicKey } from '@solana/web3.js';

export function useAuth(publicKey: PublicKey | null) {
  console.log('useAuth', publicKey);

  const nonceMutation = useMutation({
    mutationFn: async () => await fetchNonce(publicKey!.toString()),
    mutationKey: ['nonce'],
    retry: false
  });

  const verifyMutation = useMutation({
    mutationFn: verify,
    mutationKey: ['verify'],
    onSuccess: (data: VerificationResult) => {
      if (data.token) {
        console.log('Successfully signed in');
      }
    }
  });

  return { nonceMutation, verifyMutation };
}
