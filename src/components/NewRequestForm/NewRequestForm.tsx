'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { IconTooltip } from '../IconTooltip';
import { formRequestSchema, type RequestFormSchema } from './NewRequestForm.utils';

import { useDatasetRequest } from '@/context/DatasetRequestContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Citrus, X } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

export default function NewRequestForm() {
  const { formData, updateFormData, features, removeFeature } = useDatasetRequest();

  const form = useForm<RequestFormSchema>({
    resolver: zodResolver(formRequestSchema),
    defaultValues: formData
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      updateFormData(value as Partial<RequestFormSchema>);
    });
    return () => subscription.unsubscribe();
  }, [form, updateFormData]);

  useEffect(() => {
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined) {
        form.setValue(key as keyof RequestFormSchema, value);
      }
    });
  }, []);

  const onSubmit = (data: RequestFormSchema) => {
    console.log(data);
    console.log(features);
  };

  return (
    <div className="space-y-3 p-4">
      <h1 className="text-2xl">Create dataset request</h1>
      <p className="text-sm">Description of add request section</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <Card className="p-0">
            <CardContent className="space-y-2.5 p-3 text-xs">
              <h1 className="mb-2.5 text-sm">Specify request details</h1>
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
                      Request name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter request name..." {...field} className="text-xs placeholder:text-xs" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      <IconTooltip text="Dummy text">
                        <Citrus size={16} />
                      </IconTooltip>
                      Request start date
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'pl-3 text-left text-xs font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => {
                            const yesterday = new Date();
                            yesterday.setDate(yesterday.getDate() - 1);
                            return date <= yesterday;
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      <IconTooltip text="Dummy text">
                        <Citrus size={16} />
                      </IconTooltip>
                      Request end date
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'pl-3 text-left text-xs font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <IconTooltip text="Dummy text">
                        <Citrus size={16} />
                      </IconTooltip>
                      Request budget
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter amount..."
                        {...field}
                        type="number"
                        className="text-xs placeholder:text-xs"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <IconTooltip text="Dummy text">
                        <Citrus size={16} />
                      </IconTooltip>
                      Choose labeling language
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="English" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Polish">Polish</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card className="p-0">
            <CardContent className="space-y-2.5 p-3 text-xs">
              <h1 className="mb-2.5 text-sm">Specify dataset details</h1>
              <FormField
                control={form.control}
                name="datasetDesc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <IconTooltip text="Dummy text">
                        {/* TODO */}
                        <Citrus size={16} />
                      </IconTooltip>
                      Dataset description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter dataset description..."
                        className="text-xs placeholder:text-xs"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="totalSamples"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <IconTooltip text="Dummy text">
                        {/* TODO */}
                        <Citrus size={16} />
                      </IconTooltip>
                      Minimal dataset samples
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-xs placeholder:text-xs"
                        type="number"
                        placeholder="Enter samples number..."
                        {...field}
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
              <h1 className="mb-2.5 text-sm">Add image guidelines</h1>
              <FormField
                control={form.control}
                name="imageGuidelines"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <IconTooltip text="Dummy text">
                        {/* TODO */}
                        <Citrus size={16} />
                      </IconTooltip>
                      Image guidelines:
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="text-xs placeholder:text-xs"
                        placeholder="Explain to user how you would like the picture to be taken..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField // TODO ADD IMAGE UPLOAD
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <IconTooltip text="Dummy text">
                        {/* TODO */}
                        <Citrus size={16} />
                      </IconTooltip>
                      Upload example image
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="text-xs placeholder:text-xs"
                        placeholder="Drop image or upload from Your device"
                        {...field}
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
              <div className="mb-2.5 flex items-center justify-between">
                <h1 className="text-sm">Build dataset structure</h1>
                <Link passHref href="/requests/create-feature">
                  <Button type="button" size="sm" className="text-xs">
                    Add feature
                  </Button>
                </Link>
              </div>
              <p>
                Create dataset structure by adding features it requires. You can also add examples to showcase user how
                would you like gathered images to be labeled.
              </p>

              {features.length === 0 ? (
                <p className="text-muted-foreground">No features added yet.</p>
              ) : (
                <div className="space-y-2">
                  {features.map((feature) => (
                    <Card key={feature.id} className="p-3">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">Feature name: {feature.name}</p>
                          <p className="text-muted-foreground">Label guidelines: {feature.labelGuidelines}</p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeFeature(feature.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
