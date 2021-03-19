import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RouteService {
  constructor(private prismaService: PrismaService) {}

  getAllRoutes = async () => {
    return this.prismaService.route.findMany();
  };

  createRoute = async (route: string, state: boolean) => {
    return this.prismaService.route.create({
      data: {
        route: route,
        state: state,
      },
    });
  };
}
