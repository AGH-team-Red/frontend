import { Button } from '@/components/ui/button';
import type { Feature } from '@/lib/types';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import ExampleImageCarousel from './ExampleImageCarousel';

export default function ExampleImageDialog({ image, features }: { image: string; features: Feature[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-5 rounded-none p-1 text-xs">example image</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Example Image</DialogTitle>
        </DialogHeader>
        <ExampleImageCarousel features={features} image={image} />
      </DialogContent>
    </Dialog>
  );
}
