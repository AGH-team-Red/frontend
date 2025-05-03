import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import type { Feature } from "@/lib/types";
const ExampleImageCarousel = ({
  image,
  features,
}: {
  image: string;
  features: Feature[];
}) => {
  return (
    <>
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={image}
          alt="feature image"
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          className="rounded-md object-cover"
        />
      </div>
      <Carousel className="relative mt-2.5">
        <h1 className="absolute -top-3 w-full text-center">Some text</h1>
        <CarouselContent className="mt-5">
          {features.map((feature, index) => (
            <CarouselItem key={index} className="space-y-2.5 text-xs">
              <h1>{feature.name}</h1>
              <p>{feature.labelGuidelines}</p>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-card absolute top-0 -left-1" />
        <CarouselNext className="bg-card top-0 -right-1" />
      </Carousel>
    </>
  );
};

export default ExampleImageCarousel;
