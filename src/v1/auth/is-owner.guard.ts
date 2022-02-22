import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class IsOwnerGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const walletKey = request.params.key;
    const rawHeaders = request.rawHeaders;
    let authorization = rawHeaders.indexOf('authorization');
    if (authorization === -1)
      authorization = rawHeaders.indexOf('Authorization');

    const jwt = rawHeaders[authorization + 1];
    const { publicKey }: any = this.jwtService.decode(jwt.split(' ').at(-1));

    if (publicKey === walletKey) return true;

    throw new ForbiddenException('Cannot access another user');
  }
}
