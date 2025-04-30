import { Button } from "@/components/ui/button";
import type { ExampleFeature } from "@/lib/types";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function ExampleFeatureDialog({
  exampleFeatures,
}: {
  exampleFeatures: ExampleFeature[];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-5 rounded-none p-1 text-xs">
          example feature
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Example Features</DialogTitle>
        </DialogHeader>
        <Carousel className="mx-4">
          <CarouselContent>
            {exampleFeatures.map((feature, index) => (
              <CarouselItem key={index} className="space-y-2.5">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={feature.image}
                    alt={feature.label}
                    fill
                    sizes="(max-width: 768px) 100vw, 700px"
                    className="rounded-md object-cover"
                    priority={index === 0}
                  />
                </div>
                <div>
                  <h1>Label</h1>
                  <p>{feature.label}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-card -left-9" />
          <CarouselNext className="bg-card -right-9" />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
