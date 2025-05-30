import * as React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface WalletTabsProps {
  form: UseFormReturn<{ amount: number | string}>;
}

export default function WalletTabs({ form }: WalletTabsProps) {
  return (
    <Tabs defaultValue="deposit" className="w-full">
      <TabsList>
        <TabsTrigger value="deposit">Deposit</TabsTrigger>
        <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
      </TabsList>

      <TabsContent value="deposit">
        <Form {...form}>
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount to Deposit</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter amount"
                    type="number"
                    {...field}
                    inputMode="decimal"
                    className="appearance-none"
                    value={field.value ?? ''}
                  />
                </FormControl>
                <FormDescription>Enter the amount you want to deposit.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </TabsContent>

      <TabsContent value="withdraw">
        <Form {...form}>
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount to Withdraw</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter amount"
                    type="number"
                    {...field}
                    inputMode="decimal"
                    value={field.value ?? ''}
                    className="appearance-none"
                  />
                </FormControl>
                <FormDescription>Enter the amount you want to withdraw.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </TabsContent>
    </Tabs>
  );
}
