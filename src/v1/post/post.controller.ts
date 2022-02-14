import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('post')
@ApiTags('Post apis')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('new')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(
    @Body() createPostDto: CreatePostDto,
    @Headers('Authorization') jwt: string,
  ) {
    return this.postService.create(createPostDto, jwt);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Headers('Authorization') jwt: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.update(+id, updatePostDto, jwt);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string, @Headers('Authorization') jwt: string) {
    return this.postService.remove(+id);
  }
}
