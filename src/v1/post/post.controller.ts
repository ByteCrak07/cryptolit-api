import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PostEntity } from './entities/post.entity';
import { IsOwnerGuard } from '../auth/is-owner.guard';

@Controller({ path: 'post', version: '1' })
@ApiTags('Post apis')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('new/:key')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: PostEntity })
  create(
    @Body() createPostDto: CreatePostDto,
    @Param('key') walletKey: string,
  ) {
    return this.postService.create(createPostDto, walletKey);
  }

  @Get(':slug&:auth_key')
  @ApiOkResponse({ type: PostEntity })
  findOne(@Param('slug') slug: string, @Param('auth_key') authKey: string) {
    return this.postService.findOne(slug, authKey);
  }

  @Get('published/:key&:auth_key')
  @ApiOkResponse({ type: [PostEntity] })
  findAllPublished(
    @Param('key') walletKey: string,
    @Param('auth_key') authKey: string,
  ) {
    return this.postService.findAllPublished(walletKey, authKey);
  }

  @Get('drafts/:key&:auth_key')
  @UseGuards(JwtAuthGuard, IsOwnerGuard)
  @ApiOkResponse({ type: [PostEntity] })
  findAllDrafts(
    @Param('key') walletKey: string,
    @Param('auth_key') authKey: string,
  ) {
    return this.postService.findAllDrafts(walletKey, authKey);
  }

  @Get('archived/:key&:auth_key')
  @UseGuards(JwtAuthGuard, IsOwnerGuard)
  @ApiOkResponse({ type: [PostEntity] })
  findAllArchived(
    @Param('key') walletKey: string,
    @Param('auth_key') authKey: string,
  ) {
    return this.postService.findAllArchived(walletKey, authKey);
  }

  @Patch(':id&:key')
  @UseGuards(JwtAuthGuard, IsOwnerGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PostEntity })
  @ApiParam({ name: 'key', type: String })
  update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id&:key')
  @UseGuards(JwtAuthGuard, IsOwnerGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PostEntity })
  @ApiParam({ name: 'key', type: String })
  remove(@Param('id') id: number) {
    return this.postService.remove(id);
  }
}
