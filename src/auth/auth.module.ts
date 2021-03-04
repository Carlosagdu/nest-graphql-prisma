import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from 'src/prisma.service';
import { PasswordService } from './password.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    JwtStrategy,
    PasswordService,
    PrismaService,
    UserService
  ],
  exports: [JwtModule]
})
export class AuthModule {}
