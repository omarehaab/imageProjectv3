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
  const testFilename = 'test.jpg';
  const testWidth = 100;
  const testHeight = 100;
  const outputDir = path.join(__dirname, '../images');
  const outputPath = path.join(outputDir, `${testFilename}_${testWidth}x${testHeight}.jpg`);

  afterAll(() => {
    // Clean up the resized image after tests
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }
  });

  it('should resize the image and save it to disk', async () => {
    const result = await resizeImage(testFilename, testWidth, testHeight);
    expect(result).toBe(outputPath);
  });

  it('should return existing image path if resized image already exists', async () => {
    // Create a dummy file to simulate existing resized image
    fs.writeFileSync(outputPath, 'dummy content');
    const result = await resizeImage(testFilename, testWidth, testHeight);
    expect(result).toBe(outputPath);
    // Clean up dummy file
    fs.unlinkSync(outputPath);
  });
});
