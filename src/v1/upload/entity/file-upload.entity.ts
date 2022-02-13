import { ApiProperty } from '@nestjs/swagger';

export class FileUpload {
  @ApiProperty()
  url: string;
}
