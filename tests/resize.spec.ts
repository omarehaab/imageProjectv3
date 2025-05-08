import { resizeImage } from '../src/utils/imageProcessor';
import fs from 'fs';

describe('Image Resizer', () => {
  it('should resize the image and save it to disk', async () => {
    const result = await resizeImage('test.jpg', 100, 100);
    expect(fs.existsSync(result)).toBeTrue();
  });
});
