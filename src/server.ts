import express, { Request, Response, RequestHandler } from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';

export const app = express();
const port = 3000;
const publicDir = path.join(__dirname, '..');
app.use(express.static(publicDir));

// Serve static files from dist under /dist path
app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));

// Serve index.html on root route
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

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

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const allowedTypes = ['.jpg', '.jpeg'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    // Instead of error, reject file silently
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const uploadHandler: RequestHandler = (req, res) => {
  if (!req.file) {
    (res as any).status(400).json({ error: 'No files were uploaded or invalid file type.' });
    return;
  }
  console.log('Uploaded file:', req.file);
  res.json({ message: 'File uploaded successfully!', filename: req.file.filename });
};

import { NextFunction } from 'express';

app.post('/upload', upload.single('image'), (err: any, req: Express.Request, res: Express.Response, next: NextFunction) => {
  if (err instanceof multer.MulterError || err) {
    console.log('Upload error:', err.message);
    (res as any).status(400).json({ error: err.message });
    return;
  } else {
    next();
  }
}, uploadHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}
