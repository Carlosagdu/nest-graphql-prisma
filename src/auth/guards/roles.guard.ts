import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = GqlExecutionContext.create(context).getContext().req;

    let user_id = request.user.id;
    let _class = context.getClass().name;
    let mutation = context.getHandler().name;
    const final_route = _class + '/' + mutation;

    let roles = await this.getRolesByUser(user_id);
    var _authorization = false;
    var cont = 0;
    console.log({
      id: user_id,
      class: _class,
      mutation: mutation,
      finalRoute: final_route,
      roles: roles
    });

    if (!roles) {
      return false;
    }

    for (var role of roles) {
      cont++;
      var routesByRole = await this.getRoutesByRole(role.roleId);

      if (!routesByRole) {
        return false;
      }

      for (const _rutas of routesByRole) {
        if (_rutas.routes.route === final_route) {
          _authorization = true;
          break;
        }
      }

      if (_authorization == true) {
        break;
      }
    }

    return _authorization;
  }

  async getRolesByUser(id: any): Promise<any> {
    const roles = await this.prisma.user_roles.findMany({
      where: {
        userId: id,
        state: true,
      },
    });

    return roles;
  }

  async getRoutesByRole(id: any): Promise<any> {
    const rutas = await this.prisma.routes_roles.findMany({
      where: {
        roleId: id,
        state: true,
      },
      select: {
        routes: {
          select: {
            route: true,
          },
        },
      },
    });

    return rutas;
  }
}
