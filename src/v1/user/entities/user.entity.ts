import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  walletKey: string;

  @ApiProperty()
  username: string;

  @ApiProperty({ required: false })
  email: string;

  @ApiProperty({ required: false })
  fullName: string;

  @ApiProperty()
  imgUrl: string;

  @ApiProperty()
  following: number;

  @ApiProperty()
  followers: number;

  @ApiProperty({ required: false })
  donationUrl: string;

  @ApiProperty({ required: false })
  bio: string;

  @ApiProperty({ required: false })
  instaId: string;

  @ApiProperty({ required: false })
  instaLink: string;

  @ApiProperty({ required: false })
  instaVerified: boolean;

  @ApiProperty({ required: false })
  twitterId: string;

  @ApiProperty({ required: false })
  twitterLink: string;

  @ApiProperty({ required: false })
  twitterVerified: boolean;

  @ApiProperty({ required: false })
  facebookId: string;

  @ApiProperty({ required: false })
  facebookLink: string;

  @ApiProperty({ required: false })
  facebookVerified: boolean;

  @ApiProperty({ required: false })
  isWriter: boolean;

  @ApiProperty({ required: false })
  isCollector: boolean;

  @ApiProperty()
  createdAt: Date;
}
