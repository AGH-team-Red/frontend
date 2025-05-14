import httpClient from '@/lib/http-client';
import { Verification, VerificationResult } from '@/lib/types';

const fetchNonce = async (publicKey: string): Promise<number> => {
  const response = httpClient.get<number>('http://localhost:3005/auth/nonce', {
    credentials: 'include',
    body: JSON.stringify({ publicKey })
  });

  return response;
};

const verify = (verification: Verification): Promise<VerificationResult> => {
  const result = httpClient.post<VerificationResult>(
    'http://localhost:3005/auth/verify',
    {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    },
    verification
  );

  return result;
};

export { fetchNonce, verify };
