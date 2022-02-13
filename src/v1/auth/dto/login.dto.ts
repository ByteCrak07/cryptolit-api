import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEthereumAddress()
  @ApiProperty()
  walletKey: string;

  @IsNotEmpty()
  @ApiProperty()
  signature: string;
}
