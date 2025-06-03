import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outputDir = path.join(__dirname, '../../images');

export async function resizeImage(
  filename: string,
  width: number,
  height: number,
): Promise<string> {
  const inputPath = path.join(__dirname, '../../uploads', filename);
  const outputPath = path.join(outputDir, `${filename}_${width}x${height}.jpg`);

  if (fs.existsSync(outputPath)) {
    return outputPath;
  }

  try {
    await sharp(inputPath)
      .resize(width, height)
      .toFormat('jpeg')
      .toFile(outputPath);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to process image: ${error.message}`);
    } else {
      throw new Error('Failed to process image: Unknown error');
    }
  }

  return outputPath;
}
