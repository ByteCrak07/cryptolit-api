import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private auth: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWTSecret,
    });
  }

  async validate(payload: { publicKey: string; signature: string }) {
    const user = await this.auth.validateUser(payload.publicKey);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
