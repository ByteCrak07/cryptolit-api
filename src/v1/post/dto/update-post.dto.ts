import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export const PostTypes = ['Blog', 'Novel', 'Short story', 'Poem', 'Quote'];

export class UpdatePostDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsEnum(PostTypes)
  @ApiProperty()
  type: string;

  @IsNotEmpty()
  @ApiProperty()
  genre: string[];

  @IsNotEmpty()
  @ApiProperty()
  slug: string;

  @ApiProperty()
  featureImage: string;

  @ApiProperty()
  featureImageAlt: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  published: boolean;

  @ApiProperty()
  archived: boolean;

  @ApiProperty()
  publishedOn: Date;
}
