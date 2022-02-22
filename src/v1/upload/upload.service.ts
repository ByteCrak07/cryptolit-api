import { S3 } from 'aws-sdk';
import { Logger, Injectable, GatewayTimeoutException } from '@nestjs/common';

@Injectable()
export class UploadService {
  async upload(file: Express.Multer.File, type: string, name: string) {
    const bucketS3 = process.env.BUCKET_NAME;
    const fileFormat = file.mimetype.split('/')[1];

    const fileResponse: any = await this.uploadS3(
      file.buffer,
      bucketS3,
      fileFormat,
      `${type}/${name}.${fileFormat}`,
    );

    if (fileResponse.Location) return { url: fileResponse.Location };

    throw new GatewayTimeoutException();
  }

  async uploadS3(file, bucket, fileFormat, name) {
    const s3 = this.getS3();

    const params = {
      Bucket: bucket,
      Key: String(name),
      ContentType: `image/${fileFormat}`,
      Body: file,
    };

    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  getS3() {
    return new S3({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    });
  }
}
