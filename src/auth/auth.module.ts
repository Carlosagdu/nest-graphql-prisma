import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from 'src/prisma.service';
import { PasswordService } from './password.service';

@Module({
  providers: [AuthResolver, AuthService, PasswordService ,PrismaService]
})
export class AuthModule {}
