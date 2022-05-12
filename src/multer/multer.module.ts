import { Module } from '@nestjs/common';
import { MulterService } from './multer.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigService],
  providers: [MulterService],
})
export class MulterModule {}
