'use client';

import { IconTooltip } from '@/components/IconTooltip';
import { createFeatureSchema, featureSchema } from '@/components/NewRequestForm/NewRequestForm.utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useDatasetRequest } from '@/context/DatasetRequestContext';

import { zodResolver } from '@hookform/resolvers/zod';
import { Citrus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type FormSchema = z.infer<typeof featureSchema>;

export default function CreateFeature() {
  const router = useRouter();
  const { addFeature, features } = useDatasetRequest();

  const validationSchema = createFeatureSchema(features);

  const form = useForm<FormSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: '',
      labelGuidelines: ''
    }
  });

  const onSubmit = (data: FormSchema) => {
    if (data) {
      addFeature({
        name: data.name,
        labelGuidelines: data.labelGuidelines
      });
      router.push('/requests/create-request');
    }
  };

  return (
    <div className="space-y-3 p-4">
      <h1 className="text-2xl">Create dataset request</h1>
      <p className="text-sm">Description of add request section</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <Card className="p-0">
            <CardContent className="space-y-2.5 p-3 text-xs">
              <h1 className="mb-2.5 text-sm">Specify feature details</h1>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <IconTooltip text="Dummy text">
                        {/* TODO */}
                        <Citrus size={16} />
                      </IconTooltip>
                      Feature name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter feature name..." {...field} className="text-xs placeholder:text-xs" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="labelGuidelines"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <IconTooltip text="Dummy text">
                        {/* TODO */}
                        <Citrus size={16} />
                      </IconTooltip>
                      Label guidelines
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Give user hints how would you like image to be labeled..."
                        {...field}
                        className="text-xs placeholder:text-xs"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex w-full">
            <Button className="w-full">Save feature</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
