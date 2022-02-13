import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Auth } from './entity/auth.entity';
import Web3 from 'web3';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(
    walletKey: string,
    signature: string,
  ): Promise<Auth | UnauthorizedException> {
    const web3 = new Web3();
    let recoveredKey;

    try {
      recoveredKey = web3.eth.accounts.recover(
        'Please sign this message to connect to Cryptoliterature',
        signature,
      );
    } catch (e) {
      throw new UnauthorizedException('Invalid signature');
    }

    if (walletKey === recoveredKey)
      return {
        accessToken: this.jwtService.sign({
          publicKey: walletKey,
          signature: signature,
        }),
      };

    throw new UnauthorizedException('Invalid signature');
  }

  validateUser(walletKey: string) {
    return this.prisma.user.findUnique({ where: { walletKey } });
  }
}
