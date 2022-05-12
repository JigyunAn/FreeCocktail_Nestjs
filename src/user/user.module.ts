import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule,
    MulterModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        storage: multerS3({
          s3: new AWS.S3({
            accessKeyId: config.get<string>('S3_ACCESS_KEY'),
            secretAccessKey: config.get<string>('S3_SECRET_KEY'),
            region: config.get<string>('S3_REGION'),
          }),
          bucket: 'dorun-image',
          acl: 'public-read',
          key: function (req, file, cb) {
            cb(
              null,
              'images/' + Date.now() + '.' + file.originalname.split('.').pop(),
            );
          },
        }),
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
