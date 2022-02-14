import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';

export class CreateUserEntity extends UserEntity {
  @ApiProperty()
  accessToken: string;
}
