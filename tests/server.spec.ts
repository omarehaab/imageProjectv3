import request from 'supertest';
import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';

const app = express();

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, 'uploads/');
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req: Request, res: Response): Response => {
  if (!req.file) {
    return res.status(400).send('No files were uploaded.');
  }
  return res.status(200).send('File uploaded successfully!');
});

describe('POST /upload', () => {
  it('should upload an image file successfully', async () => {
    const response = await request(app)
      .post('/upload')
      .attach('image', path.join(__dirname, 'test.jpg'));
    expect(response.status).toBe(200);
    expect(response.text).toBe('File uploaded successfully!');
  });

  it('should return 400 if no file is uploaded', async () => {
    const response = await request(app).post('/upload');
    expect(response.status).toBe(400);
    expect(response.text).toBe('No files were uploaded.');
  });
});
