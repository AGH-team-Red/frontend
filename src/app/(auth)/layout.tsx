import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import NavWrapper from '@/components/Nav/NavWrapper';
import { Toaster } from '@/components/ui/sonner';

import { redirect } from 'next/navigation';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Breakout',
  description: 'breakout hackathon'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = true; // Custom logic

  if (!isAuthenticated) {
    redirect('/register');
  }

  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
