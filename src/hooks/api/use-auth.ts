'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchNonce, verify } from '@/api/auth';
import type { Verification, VerificationResult } from '@/lib/types';
import type { PublicKey } from '@solana/web3.js';

export function useAuth(publicKey: PublicKey | null) {
  const nonceQuery = useQuery({
    queryFn: async () => fetchNonce(publicKey!.toString()),
    queryKey: ['nonce'],
    staleTime: 0,
    retry: false,
    enabled: !!publicKey
  });

  const verifyMutation = useMutation({
    mutationFn: verify,
    mutationKey: ['verify'],
    onSuccess: (data: VerificationResult) => {
      if (data.success) {
        console.log('Successfully signed in');
      }
    }
  });

  return { nonceQuery, verifyMutation };
}
