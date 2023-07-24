import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { JwtModule } from '@nestjs/jwt';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    UploadModule,
    {
      ...JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' },
      }),
      global: true,
    },
    PostModule,
  ],
})
export class V1Module {}
