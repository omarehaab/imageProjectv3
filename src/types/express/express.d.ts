import { Request } from 'express';
import * as Multer from 'multer';

declare global {
  namespace Express {
    interface Request {
      file?: Multer.File;
    }
  }
}
