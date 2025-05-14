import httpClient from '@/lib/http-client';
import { Verification, VerificationResult } from '@/lib/types';

const fetchNonce = async (publicKey: string): Promise<string> => {
  console.log('started fetchNonce', publicKey);
  const response = await httpClient.post<string>(
    'http://localhost:3005/auth/nonce',
    {
      credentials: 'include'
    },
    { publicKey }
  );

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
