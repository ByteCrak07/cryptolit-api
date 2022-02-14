import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  create(createPostDto: CreatePostDto, jwt: string) {
    const { publicKey }: any = this.jwtService.decode(jwt.split(' ').at(-1));
    const slug = createPostDto.title.replace(/\s+/g, '-').toLowerCase();
    return this.prisma.post.create({
      data: {
        ...createPostDto,
        slug,
        author: { connect: { walletKey: publicKey } },
      },
    });
  }

  findAll() {
    return this.prisma.post.findMany();
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  update(id: number, updatePostDto: UpdatePostDto, jwt: string) {
    const { publicKey }: any = this.jwtService.decode(jwt.split(' ').at(-1));
    const { author } = this.prisma.post.findUnique({ where: { id } });
    console.log(author, publicKey);

    if (publicKey === author)
      return this.prisma.post.update({ data: updatePostDto, where: { id } });
  }

  remove(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}
