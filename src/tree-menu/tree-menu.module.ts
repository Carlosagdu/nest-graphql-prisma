import { Module } from '@nestjs/common';
import { TreeMenuService } from './tree-menu.service';
import { TreeMenuResolver } from './tree-menu.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [TreeMenuResolver, TreeMenuService, PrismaService]
})
export class TreeMenuModule {}
