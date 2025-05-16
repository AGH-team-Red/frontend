'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useAuth } from '@/hooks/api/use-auth';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import bs58 from 'bs58';

const API_BASE = 'http://localhost:3005';

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const { publicKey, signMessage, connected, connecting, connect } = useWallet();
  const { verifyMutation } = useAuth(publicKey);
  const { setVisible } = useWalletModal();
  const router = useRouter();
  const { login } = useAuthContext();

  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function handleSolanaLogin() {
    setError(null);
    setStatus('Opening wallet chooser...');
    setIsBusy(true);

    try {
      setVisible(true);

      await connect();

      setStatus('Waiting for wallet connection...');

      while (connecting) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      if (!publicKey) {
        throw new Error('Wallet not connected. Please approve connection.');
      }
      if (!signMessage) {
        throw new Error('Wallet does not support message signing.');
      }

      setStatus('Fetching challenge...');
      const res = await fetch(`${API_BASE}/auth/nonce`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ publicKey: publicKey.toString() })
      });
      if (!res.ok) {
        throw new Error(`Server error (${res.status}) fetching challenge.`);
      }
      const { nonce } = await res.json();

      setStatus('Signing challenge...');
      const message = new TextEncoder().encode(nonce);
      const signedBytes = await signMessage(message);
      const signature = bs58.encode(Buffer.from(signedBytes));

      setStatus('Verifying signature...');
      const data = await new Promise<any>((resolve, reject) => {
        verifyMutation.mutate(
          { publicKey: publicKey.toString(), signature },
          {
            onSuccess: (resp) => resolve(resp),
            onError: (err) => reject(err)
          }
        );
      });

      setStatus('Login successful! Redirecting...');
      login(data.token, data.user);
    } catch (e: any) {
      console.error('Solana login error:', e);
      setError(e.message || 'Unexpected error occurred.');
      setStatus(null);
    } finally {
      setIsBusy(false);
    }
  }

  async function handleEmailLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('Email login:', email, password);
    // TODO: Implement email/password login and context update
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your Solana wallet or email</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Button type="button" onClick={handleSolanaLogin} className="w-full" disabled={isBusy}>
              {isBusy ? status || 'Processing...' : 'Sign in with Solana Wallet'}
            </Button>

            {error && <div className="text-center text-sm text-red-500">{error}</div>}

            <div className="relative py-2 text-center text-sm">
              <span className="bg-background text-muted-foreground px-2">Or continue with email</span>
              <div className="absolute inset-x-0 top-1/2 border-t" />
            </div>

            <form onSubmit={handleEmailLogin} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground text-center text-xs">
        By continuing, you agree to our{' '}
        <a href="#" className="underline">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="underline">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
}
