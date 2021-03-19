import {
  Args,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { UserRoles } from 'src/models/userRoles.model';
import { UserRolesService } from './user-roles.service';

@Resolver(UserRoles)
export class UserRolesResolver {
  constructor(private readonly userRolesService: UserRolesService) {}

  @ResolveField()
  async user(@Root() userRoles: UserRoles) {
    return this.userRolesService.userField(userRoles.id);
  }

  @ResolveField()
  async roles(@Root() userRoles: UserRoles) {
    return this.userRolesService.rolesField(userRoles.id);
  }

  @Query((returns) => [UserRoles])
  async userRoles() {
    return this.userRolesService.getAllUserRoles();
  }

  @Mutation((returns) => UserRoles)
  async connectUserRole(
    @Args('userId') userId: number,
    @Args('roleId') roleId: number,
  ) {
    return this.userRolesService.connectUserRole(userId, roleId);
  }
}
