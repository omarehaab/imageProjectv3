import express, { Request, Response, RequestHandler } from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';

export const app = express();
const port = 3000;
const publicDir = path.join(__dirname, '..');
app.use(express.static(publicDir));

const storage = multer.diskStorage({
  destination: (
    req: Express.Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void,
  ) => {
    cb(null, 'uploads/');
  },
  filename: (
    req: Express.Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

const upload = multer({ storage: storage });

const uploadHandler: RequestHandler = (req, res) => {
  if (!req.file) {
    res.status(400).send('No files were uploaded.');
    return;
  }
  console.log('Uploaded file:', req.file);
  res.send('File uploaded successfully!');
};

app.post('/upload', upload.single('image'), uploadHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}
