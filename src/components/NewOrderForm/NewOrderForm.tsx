'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useDatasetRequest } from '@/context/DatasetRequestContext';
import { useCreateOrder } from '@/hooks/api/use-create-order';
import { cn } from '@/lib/utils';
import { IconTooltip } from '../IconTooltip';
import ImageUploadDropzone from '../ImageUploadDropzone/ImageUploadDropzone';
import { createOrderSchema, type CreateOrderFormSchema } from './NewOrderForm.utils';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import {
  CalendarArrowDown,
  CalendarArrowUp,
  CalendarIcon,
  CircleDollarSign,
  FolderPen,
  ImageUp,
  ImageUpscale,
  Languages,
  List,
  SwatchBook,
  X
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ClientUploadedFileData } from 'uploadthing/types';

export default function NewOrderForm() {
  const router = useRouter();
  const {
    formData,
    updateFormData,
    features,
    removeFeature,
    image: contextImage,
    setImage: UpdateImage
  } = useDatasetRequest();
  const createOrderMutation = useCreateOrder();
  const formInitialized = useRef(false);

  const form = useForm<CreateOrderFormSchema>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      ...formData,
      features: features
    },
    mode: 'onChange'
  });

  useEffect(() => {
    if (!formInitialized.current && formData) {
      form.reset(formData);
      form.setValue('exampleImageUrl', contextImage?.ufsUrl ?? '');
      setImage(contextImage);
      formInitialized.current = true;
    }
  }, [form, formData]);

  useEffect(() => {
    if (formInitialized.current) {
      form.setValue('features', features);
      form.setValue('exampleImageUrl', contextImage?.ufsUrl ?? '');
    }
  }, [features, contextImage]);

  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState<ClientUploadedFileData<{
    uploadedBy: string;
  }> | null>(null);

  const handleAddFeatureClick = () => {
    updateFormData(form.getValues());
    UpdateImage(image);
    router.push('/order/create-feature');
  };

  const onSubmit = (data: CreateOrderFormSchema) => {
    // @ts-ignore
    createOrderMutation.mutate({
      ...data,
      id: crypto.randomUUID(),
      status: 'pending',
      currentSamplesCount: 0,
      features: {
        // @ts-ignore
        create: data.features
      }
    });

    router.push('/');
  };

  return (
    <div className="min-h-[calc(100vh_-_var(--header-height))] space-y-3 p-4 md:p-8 lg:p-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl">Create dataset order</h1>
        <p className="mb-6 text-sm text-gray-400 md:text-base">Description of add order section</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-0">
                <CardContent className="space-y-2.5 p-3 text-xs md:space-y-4">
                  <h1 className="mb-2.5 text-sm md:text-lg">Specify order details</h1>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <IconTooltip tooltipText="Dummy text" Icon={FolderPen} />
                          Order name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter order name..." {...field} className="text-xs placeholder:text-xs" />
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
                          <IconTooltip tooltipText="Dummy text" Icon={CalendarArrowDown} />
                          Order start date
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
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>
                          <IconTooltip tooltipText="Dummy text" Icon={CalendarArrowUp} />
                          Order end date
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
                          <IconTooltip tooltipText="Dummy text" Icon={CircleDollarSign} />
                          Order budget
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter amount..."
                            {...field}
                            type="number"
                            className="text-xs placeholder:text-xs"
                            value={field.value ?? ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="labelingLanguage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <IconTooltip tooltipText="Dummy text" Icon={Languages} />
                          Choose labeling language
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value ?? ''}>
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue placeholder="English" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="pl">Polish</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card className="p-0 md:row-span-2">
                <CardContent className="space-y-2.5 p-3 text-xs md:space-y-4">
                  <h1 className="mb-2.5 text-sm md:text-lg">Add image guidelines</h1>
                  <FormField
                    control={form.control}
                    name="imageGuidelines"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <IconTooltip tooltipText="Dummy text" Icon={ImageUpscale} />
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
                  <FormField
                    control={form.control}
                    name="exampleImageUrl"
                    render={() => (
                      <FormItem>
                        <FormLabel>
                          <IconTooltip tooltipText="Dummy text" Icon={ImageUp} />
                          Image guidelines:
                        </FormLabel>
                        <FormControl>
                          <div className="uploader md:flex md:items-center md:justify-center md:overflow-hidden md:rounded-md">
                            <ImageUploadDropzone
                              image={image}
                              setImage={setImage}
                              isUploading={isUploading}
                              setIsUploading={setIsUploading}
                              onClientUploadCompleteAddition={() => {
                                form.setValue('exampleImageUrl', image?.ufsUrl ?? '');
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card className="p-0 md:row-span-3">
                <CardContent className="space-y-2.5 p-3 text-xs">
                  <h1 className="mb-2.5 text-sm md:text-lg">Specify dataset details</h1>
                  <FormField
                    control={form.control}
                    name="datasetDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <IconTooltip tooltipText="Dummy text" Icon={List} />
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
                    name="minSamplesCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <IconTooltip tooltipText="Dummy text" Icon={SwatchBook} />
                          Minimal dataset samples count
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-xs placeholder:text-xs"
                            type="number"
                            placeholder="Enter samples number..."
                            {...field}
                            value={field.value ?? ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card className="p-0 md:col-span-2">
                <CardContent className="space-y-2.5 p-3 text-xs">
                  <div className="mb-2.5 flex items-center justify-between">
                    <h1 className="text-sm md:text-lg">Build dataset structure</h1>
                    <Link
                      passHref
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddFeatureClick();
                      }}
                    >
                      <Button type="button" size="sm" className="text-xs">
                        Add feature
                      </Button>
                    </Link>
                  </div>
                  <p className="text-sm text-gray-400">
                    Create dataset structure by adding features it requires. You can also add examples to showcase user
                    how would you like gathered images to be labeled.
                  </p>

                  {features.length === 0 ? (
                    <p className="text-muted-foreground">No features added yet.</p>
                  ) : (
                    <div className="space-y-2">
                      {features.map((feature, id) => (
                        <Card key={id} className="p-3">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">Feature name: {feature.name}</p>
                              <p className="text-muted-foreground">Label guidelines: {feature.labelGuidelines}</p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => removeFeature(feature.name)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            <div className="mt-6 flex justify-end">
              <Button variant="default" size="sm" type="submit">
                {form.formState.isSubmitting ? 'Sending...' : 'Submit'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
