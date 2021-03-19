import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserRolesService {
  constructor(private readonly prismaService: PrismaService) {}

  userField = async (userRoleId: number) => {
    return this.prismaService.user_roles
      .findUnique({
        where: {
          id: userRoleId,
        },
      })
      .user();
  };

  rolesField = async (userRoleId: number) => {
    return this.prismaService.user_roles
      .findUnique({
        where: {
          id: userRoleId,
        },
      })
      .roles();
  };

  getAllUserRoles = async () => {
    return this.prismaService.user_roles.findMany();
  };

  connectUserRole = async (userId: number, roleId: number) => {
    return this.prismaService.user_roles.create({
      data: {
        state: true,
        user: {
          connect: {
            id: userId,
          },
        },
        roles: {
          connect: {
            id: roleId,
          },
        },
      },
    });
  };
}
