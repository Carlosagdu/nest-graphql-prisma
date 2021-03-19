import { Module } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { UserRolesResolver } from './user-roles.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [UserRolesResolver, UserRolesService, PrismaService]
})
export class UserRolesModule {}
