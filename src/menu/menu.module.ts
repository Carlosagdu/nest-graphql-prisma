import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuResolver } from './menu.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [MenuResolver, MenuService, PrismaService]
})
export class MenuModule {}
