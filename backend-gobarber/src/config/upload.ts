import multer from 'multer';
import { resolve, extname } from 'path';
import crypto from 'crypto';

const tmpPath = resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpPath,
  storage: multer.diskStorage({
    destination: tmpPath,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}_${Date.now()}${extname(file.originalname)}`;

      return callback(null, fileName);
    },
  }),
};
