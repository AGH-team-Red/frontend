'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('data ', email, password);
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your Solana wallet or email</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600"
                >
                  <svg width="20" height="20" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path
                      d="M93.96 42.3H34.11c-7.17 0-13 5.82-13 13v17.48c0 7.17 5.83 13 13 13h59.85c7.17 0 13-5.83 13-13V55.3c0-7.18-5.83-13-13-13z"
                      fill="currentColor"
                    />
                    <path
                      d="M41.54 54.9c-5.44 0-9.86 4.42-9.86 9.86s4.42 9.86 9.86 9.86 9.86-4.42 9.86-9.86-4.42-9.86-9.86-9.86zm0 16.07c-3.42 0-6.21-2.79-6.21-6.21s2.79-6.21 6.21-6.21 6.21 2.79 6.21 6.21-2.79 6.21-6.21 6.21z"
                      fill="white"
                    />
                    <path
                      d="M73.66 54.9H57.59c-1.01 0-1.83.82-1.83 1.83v16.07c0 1.01.82 1.83 1.83 1.83h16.07c1.01 0 1.83-.82 1.83-1.83V56.73c0-1.01-.82-1.83-1.83-1.83zm-1.83 16.07H59.42V58.56h12.41v12.41z"
                      fill="white"
                    />
                    <path
                      d="M86.53 54.9c-5.44 0-9.86 4.42-9.86 9.86s4.42 9.86 9.86 9.86 9.86-4.42 9.86-9.86-4.42-9.86-9.86-9.86zm0 16.07c-3.42 0-6.21-2.79-6.21-6.21s2.79-6.21 6.21-6.21 6.21 2.79 6.21 6.21-2.79 6.21-6.21 6.21z"
                      fill="white"
                    />
                  </svg>
                  Sign in with Solana Wallet
                </Button>
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-background text-muted-foreground relative z-10 px-2">Or continue with</span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{' '}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground [&_a]:hover:text-primary text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
