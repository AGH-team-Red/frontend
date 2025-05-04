'use client';

import { IconTooltip } from '@/components/IconTooltip';
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

const formSchema = z.object({
  featureName: z.string().min(1, 'Feature name is required'),
  labelGuidelines: z.string(),
  labelImage: z.string()
});

type FormSchema = z.infer<typeof formSchema>;

export default function CreateFeature() {
  const router = useRouter();
  const { addFeature } = useDatasetRequest();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      featureName: '',
      labelGuidelines: '',
      labelImage: ''
    }
  });

  const onSubmit = (data: FormSchema) => {
    if (data) {
      addFeature({
        name: data.featureName,
        labelGuidelines: data.labelGuidelines,
        labelImage: data.labelImage
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
                name="featureName"
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

          <Card className="p-0">
            <CardContent className="space-y-2.5 p-3 text-xs">
              <h1 className="mb-2.5 text-sm">Add example for this feature</h1>
              <p>To best showcase user how would you like image to be labeled create example</p>
              <FormField
                control={form.control}
                name="labelImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <IconTooltip text="Dummy text">
                        {/* TODO */}
                        <Citrus size={16} />
                      </IconTooltip>
                      Label image
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe image according your guidelines"
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
