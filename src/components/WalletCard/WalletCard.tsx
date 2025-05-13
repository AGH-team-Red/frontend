'use client';
import * as React from 'react';
import { useForm } from 'react-hook-form'; // Poprawny import
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import WalletTabs from './WalletTabs';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  amount: z
    .number({
      required_error: 'Amount is required',
      invalid_type_error: 'Amount must be a number'
    })
    .positive({ message: 'Amount must be a positive number.' })
});

export default function WalletCard() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0
    }
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Wallet</CardTitle>
        <CardDescription>Manage your deposits and withdrawals here.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <p>Your balance</p>
              <div>0.0000 SOL</div>
              <WalletTabs form={form} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
