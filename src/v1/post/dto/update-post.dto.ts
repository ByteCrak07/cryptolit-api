import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsArray, IsOptional } from 'class-validator';

export const PostTypes = ['Blog', 'Novel', 'Short story', 'Poem', 'Quote'];

export class UpdatePostDto {
  @ApiProperty()
  title: string;

  @IsOptional()
  @IsEnum(PostTypes)
  @ApiProperty()
  type: string;

  @IsOptional()
  @IsArray()
  @ApiProperty()
  genre: string[];

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
