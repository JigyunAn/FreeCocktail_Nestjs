import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { LikeModule } from '../like/like.module';

import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';

@Module({
  imports: [
    LikeModule,
    TypeOrmModule.forFeature([Recipe]),
    MulterModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        storage: multerS3({
          s3: new AWS.S3({
            accessKeyId: config.get<string>('S3_ACCESS_KEY'),
            secretAccessKey: config.get<string>('S3_SECRET_KEY'),
            region: config.get<string>('S3_REGION'),
          }),
          bucket: 'cocktail-img',
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
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
