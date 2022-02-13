import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    AuthModule,
    UploadModule,
    {
      ...JwtModule.register({
        secret: process.env.JWTSecret,
        signOptions: { expiresIn: '1d' },
      }),
      global: true,
    },
  ],
})
export class V1Module {}
