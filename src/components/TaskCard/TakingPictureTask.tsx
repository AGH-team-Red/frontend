'use client';

import { IconTooltip } from '@/components/IconTooltip';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PictureTask } from '@/lib/types';
import { Image as ImageIcon, ImageDown } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import ImageUploadDropzone from '../ImageUploadDropzone/ImageUploadDropzone';
import type { ClientUploadedFileData } from 'uploadthing/types';

export default function TakingPictureTask({ pictureTask }: { pictureTask?: PictureTask }): React.ReactElement {
  // TODO: Rethink typing props
  if (!pictureTask) {
    return <div>Could not load picture task</div>;
  }

  const [isUploading, setIsUploading] = useState(false);
  const [image, setImage] = useState<ClientUploadedFileData<{
    uploadedBy: string;
  }> | null>(null);

  // const { exampleImgUrl } = pictureTask;

  return (
    <>
      <Card className="py-3">
        <CardContent className="flex flex-col space-y-2 px-3 text-xs">
          <h2>Example image</h2>
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={'https://picsum.photos/350/160'} // TODO ADD REAL EXAMPLE IMAGE
              className="rounded-md object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              alt="Example image"
            />
          </div>
          <div className="flex items-center gap-2">
            <IconTooltip text="Dummy text">
              <ImageIcon size={16} />
            </IconTooltip>
            Image guidelines: {'TODO'}
          </div>
        </CardContent>
      </Card>
      <div className="flex items-center gap-2 text-xs">
        <IconTooltip text="Dummy text">
          <ImageDown size={16} />
        </IconTooltip>
        Upload Image
      </div>
      <ImageUploadDropzone
        image={image}
        setImage={setImage}
        isUploading={isUploading}
        setIsUploading={setIsUploading}
      />
      <div className="mt-auto flex justify-end md:mt-0">
        <Button
          disabled={isUploading || !image?.ufsUrl || image?.ufsUrl === ''}
          onClick={() => console.log('Image saved:', image?.ufsUrl)} // TODO: SEND IMAGE TO BACKEND
        >
          Save Image
        </Button>
      </div>
    </>
  );
}
