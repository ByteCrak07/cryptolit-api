import { ApiProperty } from '@nestjs/swagger';
import { Post } from '@prisma/client';

export class PostEntity implements Post {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  excerpt: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  featureImage: string;

  @ApiProperty()
  featureImageAlt: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  genre: string[];

  @ApiProperty()
  content: string;

  @ApiProperty()
  published: boolean;

  @ApiProperty()
  archived: boolean;

  @ApiProperty()
  authorWalletKey: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  publishedOn: Date;
}
