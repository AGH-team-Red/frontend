'use client';

import { UploadDropzone } from '@/lib/uploadthing';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { deleteUTFiles } from './deleteImageAction';
import type { ClientUploadedFileData } from 'uploadthing/types';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function ImageUploadDropzone({
  className,
  image,
  isUploading,
  setImage,
  setIsUploading,
  onClientUploadCompleteAddition
}: {
  className?: string;
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
  onClientUploadCompleteAddition?: () => void;
}) {
  const deleteImage = async () => {
    if (!image) return;

    await deleteUTFiles([image.key]);
    toast.error('Image deleted successfully!');
    setImage(null);
    setIsUploading(false);
  };

  return image ? (
    <Card className={cn('p-3', className)}>
      <div className="flex justify-between">
        <div className="flex items-center">
          <p className="font-medium">{image.name}</p>
        </div>
        <Button type="button" variant="ghost" size="sm" onClick={deleteImage}>
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
      className={cn(
        'bg-foreground/10 ut-button:bg-foreground ut-button:text-background ut-allowed-content:text-foreground ut-label:text-foreground/50 hover:ut-label:text-foreground ut-uploading:ut-button:cursor-not-allowed ut-uploading:ut-button:bg-foreground/90',
        className
      )}
      onUploadBegin={() => {
        toast('Uploading image...', {
          icon: '📸',
          description: 'Please wait while we upload your image.',
          duration: 5000
        });
        setIsUploading(true);
      }}
      onClientUploadComplete={(res) => {
        toast.success('Upload complete!');
        setImage(res[0]);
        setIsUploading(false);
        onClientUploadCompleteAddition?.();
      }}
      onUploadError={(error: Error) => {
        toast.error('Upload failed. Please try again.');
        setIsUploading(false);
      }}
    />
  );
}
