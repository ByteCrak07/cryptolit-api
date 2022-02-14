import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEthereumAddress,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsEthereumAddress()
  @ApiProperty()
  walletKey: string;

  @IsNotEmpty()
  @ApiProperty()
  signature: string;

  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsOptional()
  @ApiProperty()
  fullName: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsBoolean()
  @ApiProperty()
  isWriter: boolean;

  @IsBoolean()
  @ApiProperty()
  isCollector: boolean;
}
