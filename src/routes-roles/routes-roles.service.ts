import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RoutesRolesService {
  constructor(private readonly prismaService: PrismaService) {}

  routeField = async (routesRolesId: number) => {
    return this.prismaService.routes_roles
      .findUnique({
        where: {
          id: routesRolesId,
        },
      })
      .routes();
  };

  rolesField = async(routesRolesId: number) => {
    return this.prismaService.routes_roles.findUnique({
        where:{
            id: routesRolesId
        }
    }).roles()
  }

  getAllRoutesRoles = async() =>{
    return this.prismaService.routes_roles.findMany()
  }

  connectRoutesRoles = async(routeId: number, roleId: number) =>{
    return this.prismaService.routes_roles.create({
      data:{
        state: true,
        routes:{
          connect:{
            id:routeId
          }
        },
        roles:{
          connect:{
            id: roleId
          }
        }
      }
    })
  }
}
