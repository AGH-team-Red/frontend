"use client";

import { IconTooltip } from "@/components/IconTooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Citrus } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  label: z.string().min(1, {
    message: "Label is required",
  }),
});

export default function LabelingTask({
  labelGuidelines,
}: {
  labelGuidelines: string;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <>
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={"https://picsum.photos/350/160"}
          className="rounded-md object-cover"
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          alt="Example image"
        />
      </div>

      <Card className="py-3">
        <CardContent className="flex flex-col space-y-2 px-3 text-xs">
          <div className="flex justify-between">
            <h2>Label</h2>
            {/* TODO */}
            <Button className="h-6 px-1 py-0 text-xs">example label</Button>
          </div>
          <div className="flex items-center gap-2">
            <IconTooltip text="Dummy text">
              <Citrus size={16} />
            </IconTooltip>
            Image guidelines: {labelGuidelines}
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
                  <IconTooltip text="Dummy text">
                    {/* TODO */}
                    <Citrus size={16} />
                  </IconTooltip>
                  Feature name
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
            <Button>Go Back</Button>
            <Button type="submit">Save and Continue</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
