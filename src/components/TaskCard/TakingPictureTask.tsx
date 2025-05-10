'use client';

import { IconTooltip } from '@/components/IconTooltip';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Citrus } from 'lucide-react';
import Image from 'next/image';
import { PictureTask } from '@/lib/types';
import { UploadDropzone } from '@/lib/uploadthing';
import { useState } from 'react';

export default function TakingPictureTask({ pictureTask }: { pictureTask?: PictureTask }): React.ReactElement {
  // TODO: Rethink typing props
  if (!pictureTask) {
    return <div>Could not load picture task</div>;
  }

  const [uploadedImage, setUploadedImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  // const { exampleImgUrl } = pictureTask;

  console.log(uploadedImage);

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
      <UploadDropzone
        disabled={isUploading || uploadedImage !== ''}
        endpoint="imageUploader"
        appearance={{
          button: 'ut-uploading:cursor-not-allowed bg-white text-black border-white shadow-sm hover:bg-white/90',
          allowedContent: 'text-white'
        }}
        className="bg-foreground/10 ut-button:bg-foreground ut-button:text-background ut-allowed-content:text-foreground ut-label:text-foreground/50 hover:ut-label:text-foreground ut-uploading:ut-button:cursor-not-allowed ut-uploading:ut-button:bg-foreground/90"
        onUploadBegin={() => {
          setIsUploading(true);
        }}
        onClientUploadComplete={(res) => {
          setUploadedImage(res[0].ufsUrl);
          setIsUploading(false);
        }}
        onUploadError={(error: Error) => {
          console.error('Upload error:', error); // TODO MAYBE ADD TOAST
          setIsUploading(false);
        }}
      />
      <Button
        disabled={isUploading || !uploadedImage || uploadedImage === ''}
        onClick={() => console.log('Image saved:', uploadedImage)} // TODO: SEND IMAGE TO BACKEND
      >
        Save Image
      </Button>
    </>
  );
}
