import * as React from 'react';
import { UseFormReturn } from 'react-hook-form'; // Importowanie typu
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Definicja typu propsów
interface WalletTabsProps {
  form: UseFormReturn<{ amount: number }>; // Typ dla props form
}

export default function WalletTabs({ form }: WalletTabsProps) {
  return (
    <Tabs defaultValue="deposit" className="w-full">
      <TabsList>
        <TabsTrigger value="deposit">Deposit</TabsTrigger>
        <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
      </TabsList>

      {/* Zakładka Deposit */}
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
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    className="appearance-none"
                  />
                </FormControl>
                <FormDescription>Enter the amount you want to deposit.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </TabsContent>

      {/* Zakładka Withdraw */}
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
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
