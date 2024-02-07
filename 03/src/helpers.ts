// hw3 task2:
import axios from 'axios';
import fs from 'fs';

const processImage = async (imageUrl: string, filePath: string): Promise<void> => {
  try {
    const { data } = await axios.get<Buffer>(imageUrl, { responseType: 'arraybuffer' });
    await fs.promises.writeFile(filePath, Buffer.from(data));
  } catch (error) {
    throw error;
  }
}

export { processImage }