"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Citrus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  startDate: z.date(),
  dueDate: z.date(),
  budget: z.coerce.number().min(1, "Budget is required"),
  language: z.string().min(1, "Language is required"),
  datasetDesc: z.string(),
  totalSamples: z.coerce
    .number()
    .min(1, "Minimal dataset samples are required"),
  imageGuidelines: z.string(),
  // exampleImage:
});

type FormSchema = z.infer<typeof formSchema>;

export default function CreateRequest() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormSchema) => {
    console.log(data);
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
                      <Input
                        placeholder="Enter request name..."
                        {...field}
                        className="text-xs placeholder:text-xs"
                      />
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
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left text-xs font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
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
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left text-xs font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
        </form>
      </Form>
    </div>
  );
}

const IconTooltip = ({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
