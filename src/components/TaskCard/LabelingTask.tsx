'use client';

import { IconTooltip } from '@/components/IconTooltip';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { LabelTask } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { HelpCircle, Info } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

const formSchema = z.object({
  label: z.string().min(1, {
    message: 'Label is required'
  })
});

type LabelResponse = Record<string, string>;

export default function LabelingTask({ labelTask }: { labelTask?: LabelTask }) {
  // TODO: Rethink typing props
  if (!labelTask) {
    return <div>Could not load label task</div>;
  }

  const [step, setStep] = useState(0);
  const totalSteps = labelTask.featureLabels.length;

  const [labels, setLabels] = useState<LabelResponse>(() =>
    Object.fromEntries(labelTask.featureLabels.map((featureLabel) => [featureLabel.id, '']))
  );
  const currentFeature = labelTask.featureLabels[step];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: labels[currentFeature.id] || ''
    }
  });

  const handleBack = () => {
    if (step > 0) {
      setLabels((prev) => ({
        ...prev,
        [currentFeature.id]: form.getValues().label
      }));

      setStep((prev) => prev - 1);

      const prevStep = step - 1;
      setTimeout(() => form.setValue('label', labels[labelTask.featureLabels[prevStep].id] || ''));
    }
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setLabels((prev) => ({
      ...prev,
      [currentFeature.id]: data.label
    }));

    setStep((prev) => {
      if (prev + 1 >= totalSteps) {
        console.log('All labels', labels, currentFeature.id, data.label);
        return prev;
      }

      const nextStep = prev + 1;
      setTimeout(() => form.setValue('label', labels[labelTask.featureLabels[nextStep].id] || ''));
      return nextStep;
    });
  };

  return (
    <>
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={'https://picsum.photos/350/160'}
          className="rounded-md object-cover"
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          alt="Example image"
        />
      </div>

      <Card className="py-3">
        <CardContent className="flex flex-col space-y-2 px-3 text-xs">
          <div className="flex justify-between">
            <h2>Label {currentFeature.featureLabel}</h2>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="h-6 px-1 py-0 text-xs">example label</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Example Label</DialogTitle>
                </DialogHeader>
                Some example label text
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center gap-2">
            <IconTooltip text="Dummy text">
              <Info size={16} />
            </IconTooltip>
            Image guidelines: {currentFeature.featureLabel}
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <IconTooltip text={'Enter details about this feature'}>
                    <HelpCircle size={16} />
                  </IconTooltip>
                  {currentFeature.featureLabel}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe image according to the guidelines"
                    className="text-xs placeholder:text-xs"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <Button variant="secondary" type="button" onClick={handleBack} disabled={step === 0}>
              Back
            </Button>
            <Button type="submit">{step + 1 === totalSteps ? 'Submit' : 'Next'}</Button>
          </div>

          <div className="text-center text-xs text-gray-500">
            Task {step + 1} of {totalSteps}
          </div>
        </form>
      </Form>
    </>
  );
}
