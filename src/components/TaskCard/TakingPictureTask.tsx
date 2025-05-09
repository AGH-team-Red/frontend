import { IconTooltip } from '@/components/IconTooltip';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Citrus } from 'lucide-react';
import Image from 'next/image';
import { PictureTask } from '@/lib/types';

export default function TakingPictureTask({ pictureTask }: { pictureTask?: PictureTask }): React.ReactElement {
  // TODO: Rethink typing props
  if (!pictureTask) {
    return <div>Could not load picture task</div>;
  }

  const { exampleImgUrl } = pictureTask;

  return (
    <>
      <Card className="py-3">
        <CardContent className="flex flex-col space-y-2 px-3 text-xs">
          <h2>Example image</h2>
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={exampleImgUrl || ''}
              className="rounded-md object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              alt="Example image"
            />
          </div>
          <div className="flex items-center gap-2">
            <IconTooltip text="Dummy text">
              <Citrus size={16} />
            </IconTooltip>
            Image guidelines: {'TODO'}
          </div>
        </CardContent>
      </Card>
      <div className="flex items-center gap-2 text-xs">
        <IconTooltip text="Dummy text">
          <Citrus size={16} />
        </IconTooltip>
        Upload Image
      </div>
      <div className="flex h-20 w-full items-center justify-center rounded-md bg-gray-600/20">
        Placeholder for image uploader
      </div>
      <Button>Save Image</Button>
    </>
  );
}
