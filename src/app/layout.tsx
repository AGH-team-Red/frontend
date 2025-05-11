import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';

import './globals.css';
import Providers from './providers';
import NavWrapper from '@/components/Nav/NavWrapper';
import { Toaster } from '@/components/ui/sonner';
import { ourFileRouter } from './api/uploadthing/core';
import { BreadcrumbProvider } from '@/context/BreadcrumbContext';

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
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <Providers>
          <BreadcrumbProvider>
            <NavWrapper>
              {children}
              <Toaster />
            </NavWrapper>
          </BreadcrumbProvider>
        </Providers>
      </body>
    </html>
  );
}
