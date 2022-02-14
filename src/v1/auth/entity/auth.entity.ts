import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/v1/user/entities/user.entity';

export class Auth extends UserEntity {
  @ApiProperty()
  accessToken: string;
}
