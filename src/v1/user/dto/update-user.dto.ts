import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: false })
  username: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ required: false })
  email: string;

  @ApiProperty({ required: false })
  fullName: string;

  @ApiProperty({ required: false })
  imgUrl: string;

  @ApiProperty({ required: false })
  donationUrl: string;

  @ApiProperty({ required: false })
  bio: string;

  @ApiProperty({ required: false })
  instaId: string;

  @ApiProperty({ required: false })
  instaLink: string;

  @ApiProperty({ required: false })
  twitterId: string;

  @ApiProperty({ required: false })
  twitterLink: string;

  @ApiProperty({ required: false })
  facebookId: string;

  @ApiProperty({ required: false })
  facebookLink: string;
}
