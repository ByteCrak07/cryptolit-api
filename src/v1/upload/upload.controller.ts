import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  FileUploadBodyDto,
  FileUploadDto,
  UploadDto,
} from './dto/file-upload.dto';
import { FileUpload } from './entity/file-upload.entity';
import { imageFileFilter } from './file-helper';
import { UploadService } from './upload.service';
import { randomUUID } from 'crypto';

@Controller({ path: 'upload', version: '1' })
@ApiTags('Image upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadDto,
  })
  @ApiCreatedResponse({ type: FileUpload })
  @UseInterceptors(FileInterceptor('file', { fileFilter: imageFileFilter }))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() fileUploadBodyDto: FileUploadBodyDto,
  ) {
    if (!file) throw new BadRequestException('No file uploaded');
    if (!fileUploadBodyDto.type)
      throw new BadRequestException('No type specified');
    if (!fileUploadBodyDto.name)
      throw new BadRequestException('No file name specified');

    return await this.uploadService.upload(
      file,
      fileUploadBodyDto.type,
      fileUploadBodyDto.name,
    );
  }

  @Post('/posts')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  @ApiCreatedResponse({ type: FileUpload })
  @UseInterceptors(FileInterceptor('file', { fileFilter: imageFileFilter }))
  async postsUpload(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file uploaded');

    return await this.uploadService.upload(
      file,
      'posts',
      randomUUID() + file.originalname,
    );
  }
}
