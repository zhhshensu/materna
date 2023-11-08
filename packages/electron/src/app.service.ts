import { Injectable } from '@nestjs/common';
import path from 'path';
import Archiver from 'utils/archiver';

@Injectable()
export class AppService {
  getHello(): string {
    const zipFile = path.join(__dirname, 'utils/202205188806-C00014.zip');
    const dirPath = path.join(__dirname, 'utils/');
    const archiver: Archiver = new Archiver(zipFile, dirPath);
    archiver.onUnZipComplete = (code: any) => {
      console.log(code);
    };
    archiver.unzip();
    return 'Hello!';
  }
}
