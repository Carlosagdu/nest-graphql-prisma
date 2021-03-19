import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { RouteResolver } from './route.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [RouteResolver, RouteService, PrismaService]
})
export class RouteModule {}
