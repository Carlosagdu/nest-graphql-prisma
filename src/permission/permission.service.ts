import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PermissionService {
  constructor(private prismaService: PrismaService) {}

  userField = async (id: number) => {
    return this.prismaService.permissions
      .findUnique({
        where: {
          id: id,
        },
      })
      .user();
  };

  getPermissionByUserId = async (userId: number) => {
    return this.prismaService.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .Permissions();
  };

  assignPermissionToUser = async (userId: number) => {
    // Check if current user has permissions
    const permissionId = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        Permissions: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!permissionId) {
      throw new Error(`User with id: ${userId} doesn't exist`);
    }
    const userRoles = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        User_roles: true,
      },
    });

    const routesRoles = await this.prismaService.routes_roles.findMany({
      where: {
        roleId: userRoles.User_roles.roleId,
      },
      select: {
        routes: true,
      },
    });

    let enabledRoutes = [];
    let enabledRoutesSplited = [];
    routesRoles.forEach((item) => {
      enabledRoutes.push(item.routes.route);
      enabledRoutesSplited.push(item.routes.route.split('/'));
    });
    let resolversName = [];

    enabledRoutesSplited.forEach((item) => {
      if (!resolversName.includes(item[0])) {
        resolversName.push(item[0]);
      }
    });

    let accessTo = [];
    for (let i = 0; i < resolversName.length; i++) {
      accessTo.push(resolversName[i]);
    }
    // If this user does not have a permissions associated
    // we're going to create it
    if (!permissionId.Permissions) {
      return this.prismaService.permissions.create({
        data: {
          access: accessTo,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }

    // Otherwise, we update the menu associated
    // to the user
    return this.prismaService.permissions.upsert({
      where: {
        id: permissionId.Permissions.id,
      },
      update: {
        access: accessTo,
      },
      create: {
        access: accessTo,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  };
}
