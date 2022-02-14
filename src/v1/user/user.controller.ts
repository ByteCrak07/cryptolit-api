import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserEntity } from './entities/create-user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller({ path: 'user', version: '1' })
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('new')
  @ApiCreatedResponse({ type: CreateUserEntity })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('all/:auth_key')
  @ApiOkResponse({ type: [String] })
  findAll(@Param('auth_key') authKey: string) {
    return this.userService.findAll(authKey);
  }

  @Get(':key&:auth_key')
  @ApiOkResponse({ type: UserEntity })
  findOne(@Param('key') walletKey: string, @Param('auth_key') authKey: string) {
    return this.userService.findOne(walletKey, authKey);
  }

  @Get('name/:username&:auth_key')
  @ApiOkResponse({ type: UserEntity })
  findOneWithUsername(
    @Param('username') username: string,
    @Param('auth_key') authKey: string,
  ) {
    return this.userService.findOneWithUsername(username, authKey);
  }

  @Patch(':key')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  update(
    @Param('key') walletKey: string,
    @Headers('Authorization') jwt: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(walletKey, jwt, updateUserDto);
  }

  @Delete(':key')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  remove(
    @Param('key') walletKey: string,
    @Headers('Authorization') jwt: string,
  ) {
    return this.userService.remove(walletKey, jwt);
  }
}
