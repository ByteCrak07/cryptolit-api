import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

export class FileUploadBodyDto {
  @ApiProperty()
  type: string;

  @ApiProperty()
  name: string;
}

export class UploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;

  @ApiProperty()
  type: string;

  @ApiProperty()
  name: string;
}
