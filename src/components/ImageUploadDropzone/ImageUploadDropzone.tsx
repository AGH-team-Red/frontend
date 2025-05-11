'use client';

import { UploadDropzone } from '@/lib/uploadthing';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { deleteUTFiles } from './deleteImageAction';
import type { ClientUploadedFileData } from 'uploadthing/types';

export default function ImageUploadDropzone({
  image,
  isUploading,
  setImage,
  setIsUploading
}: {
  image: ClientUploadedFileData<{
    uploadedBy: string;
  }> | null;
  isUploading: boolean;
  setImage: (
    image: ClientUploadedFileData<{
      uploadedBy: string;
    }> | null
  ) => void;
  setIsUploading: (isUploading: boolean) => void;
}) {
  const deleteImage = async () => {
    if (!image) return;

    await deleteUTFiles([image.key]);
    setImage(null);
    setIsUploading(false);
  };

  return image ? (
    <Card className="p-3">
      <div className="flex justify-between">
        <div className="flex items-center">
          <p className="font-medium">{image.name}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={deleteImage}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  ) : (
    <UploadDropzone
      disabled={isUploading || !!image}
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
        setImage(res[0]);
        setIsUploading(false);
      }}
      onUploadError={(error: Error) => {
        console.error('Upload error:', error); // TODO MAYBE ADD TOAST
        setIsUploading(false);
      }}
    />
  );
}
