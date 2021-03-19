import { Module } from '@nestjs/common';
import { RoutesRolesService } from './routes-roles.service';
import { RoutesRolesResolver } from './routes-roles.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [RoutesRolesResolver, RoutesRolesService, PrismaService]
})
export class RoutesRolesModule {}
