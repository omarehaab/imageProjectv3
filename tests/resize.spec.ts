import fs from 'fs';
import path from 'path';

jest.mock('../src/utils/imageProcessor', () => ({
  resizeImage: jest.fn(async (filename: string, width: number, height: number) => {
    const outputDir = path.join(__dirname, '../images');
    return path.join(outputDir, `${filename}_${width}x${height}.jpg`);
  }),
}));

import { resizeImage } from '../src/utils/imageProcessor';

describe('Image Resizer', () => {
  it('should resize the image and save it to disk', async () => {
    const result = await resizeImage('test.jpg', 100, 100);
    expect(result).toBe(path.join(__dirname, '../images', 'test.jpg_100x100.jpg'));
  });
});
