'use server';
import { UTApi } from 'uploadthing/server';

const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN
});

export const deleteUTFiles = async (files: string[]) => {
  try {
    console.log('UTAPI: Deleting files', files);
    const res = await utapi.deleteFiles(files);
    console.log('UTAPI: Files deleted successfully', res);
  } catch (error) {
    console.error('UTAPI: Error deleting files', error);
  }
};
