import multer from 'multer';
import { resolve, extname } from 'path';
import crypto from 'crypto';

const tmpFolder = resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder,
  uploadsFolder: resolve(tmpFolder, 'uploads'),

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}_${Date.now()}${extname(file.originalname)}`;

      return callback(null, fileName);
    },
  }),
};
