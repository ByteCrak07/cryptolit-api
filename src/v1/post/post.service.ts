import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  create(createPostDto: CreatePostDto, walletKey: string) {
    const slug = createPostDto.title.replace(/\s+/g, '-').toLowerCase();
    return this.prisma.post.create({
      data: {
        ...createPostDto,
        slug,
        author: { connect: { walletKey: walletKey } },
      },
    });
  }

  findAllPublished(walletKey: string, authKey: string) {
    if (authKey === process.env.CLIENT_AUTH_KEY)
      return this.prisma.post.findMany({
        where: { authorWalletKey: walletKey, published: true, archived: false },
        select: {
          id: true,
          title: true,
          slug: true,
          publishedOn: true,
          createdAt: true,
          author: { select: { username: true, fullName: true, imgUrl: true } },
          type: true,
        },
      });

    throw new UnauthorizedException('No authorization');
  }

  findAllDrafts(walletKey: string, authKey: string) {
    if (authKey === process.env.CLIENT_AUTH_KEY)
      return this.prisma.post.findMany({
        where: {
          authorWalletKey: walletKey,
          published: false,
          archived: false,
        },
        select: {
          id: true,
          title: true,
          slug: true,
          publishedOn: true,
          createdAt: true,
          author: { select: { username: true, fullName: true, imgUrl: true } },
          type: true,
        },
      });

    throw new UnauthorizedException('No authorization');
  }

  findAllArchived(walletKey: string, authKey: string) {
    if (authKey === process.env.CLIENT_AUTH_KEY)
      return this.prisma.post.findMany({
        where: {
          authorWalletKey: walletKey,
          archived: true,
        },
        select: {
          id: true,
          title: true,
          slug: true,
          publishedOn: true,
          createdAt: true,
          author: { select: { username: true, fullName: true, imgUrl: true } },
          type: true,
        },
      });

    throw new UnauthorizedException('No authorization');
  }

  findOne(slug: string, authKey: string) {
    if (authKey === process.env.CLIENT_AUTH_KEY)
      return this.prisma.post.findUnique({
        where: { slug },
        include: { author: true },
      });

    throw new UnauthorizedException('No authorization');
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.prisma.post.update({ data: updatePostDto, where: { id } });
  }

  remove(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}
