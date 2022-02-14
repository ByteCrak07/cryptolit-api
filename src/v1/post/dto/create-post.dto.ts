import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export const PostTypes = ['Blog', 'Novel', 'Short story', 'Poem', 'Quote'];

export class CreatePostDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsEnum(PostTypes)
  @ApiProperty()
  type: string;

  @IsNotEmpty()
  @ApiProperty()
  genre: string[];
}
