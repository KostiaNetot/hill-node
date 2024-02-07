// hw3 task2:
import axios from 'axios';
import fs from 'fs';
import { ImageRequest } from './types';

const processImage = async ({ url, path }: ImageRequest): Promise<void> => {
  try {
    const { data } = await axios.get<Buffer>(url, { responseType: 'arraybuffer' });
    await fs.promises.writeFile(path, Buffer.from(data));
  } catch (error) {
    throw error;
  }
}

export { processImage }