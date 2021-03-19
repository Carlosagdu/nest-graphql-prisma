import {
  ResolveField,
  Resolver,
  Root,
  Query,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { RoutesRoles } from 'src/models/routesRoles.model';
import { RoutesRolesService } from './routes-roles.service';

@Resolver(RoutesRoles)
export class RoutesRolesResolver {
  constructor(private readonly routesRolesService: RoutesRolesService) {}

  @ResolveField()
  async route(@Root() routesRoles: RoutesRoles) {
    return this.routesRolesService.routeField(routesRoles.id);
  }

  @ResolveField()
  async roles(@Root() routesRoles: RoutesRoles) {
    return this.routesRolesService.rolesField(routesRoles.id);
  }

  @Query((returns) => [RoutesRoles])
  async routesRoles() {
    return this.routesRolesService.getAllRoutesRoles();
  }

  @Mutation((returns) => RoutesRoles)
  async connectRoutesRoles(
    @Args('routeId') routeId: number,
    @Args('roleId') roleId: number,
  ) {
    return this.routesRolesService.connectRoutesRoles(routeId, roleId)
  }
}
