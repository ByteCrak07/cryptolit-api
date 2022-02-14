import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import Web3 from 'web3';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async create(createUserDto: CreateUserDto) {
    const { signature, ...data } = createUserDto;
    const imgUrl = `https://avatars.dicebear.com/api/micah/${data.username}.svg`;
    let recoveredKey;

    const web3 = new Web3();
    try {
      recoveredKey = web3.eth.accounts.recover(
        'Please sign this message to connect to Cryptoliterature',
        signature,
      );
    } catch (e) {
      throw new UnauthorizedException('Invalid signature');
    }

    if (data.walletKey.toLowerCase() === recoveredKey.toLowerCase()) {
      const user = await this.prisma.user.create({ data: { ...data, imgUrl } });
      return {
        ...user,
        accessToken: this.jwtService.sign({
          publicKey: data.walletKey,
          signature: signature,
        }),
      };
    }

    throw new UnauthorizedException('Invalid signature');
  }

  async findAll(authKey: string) {
    if (authKey === process.env.CLIENT_AUTH_KEY) {
      const data = await this.prisma.user.findMany();
      const usernames = data.map((user) => user.username);
      return usernames;
    }

    throw new UnauthorizedException('No authorization');
  }

  async findOne(walletKey: string, authKey: string) {
    if (authKey === process.env.CLIENT_AUTH_KEY)
      return await this.prisma.user.findUnique({ where: { walletKey } });

    throw new UnauthorizedException('No authorization');
  }

  async findOneWithUsername(username: string, authKey: string) {
    if (authKey === process.env.CLIENT_AUTH_KEY)
      return await this.prisma.user.findUnique({ where: { username } });

    throw new UnauthorizedException('No authorization');
  }

  async update(walletKey: string, jwt: string, updateUserDto: UpdateUserDto) {
    const { publicKey }: any = this.jwtService.decode(jwt.split(' ').at(-1));

    if (walletKey === publicKey)
      return await this.prisma.user.update({
        data: updateUserDto,
        where: { walletKey },
      });

    throw new UnauthorizedException('Cannot access another user');
  }

  async remove(walletKey: string, jwt: string) {
    const { publicKey }: any = this.jwtService.decode(jwt.split(' ').at(-1));

    if (walletKey === publicKey)
      return await this.prisma.user.delete({ where: { walletKey } });

    throw new UnauthorizedException('Cannot access another user');
  }
}
