import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from 'src/models/roles.model';
import { RoleInput } from './dto/createRole.input';
import { RolesService } from './roles.service';

@Resolver(Roles)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Query((returns) => [Roles])
  async roles() {
    return this.rolesService.getAllRoles();
  }

  @Mutation((returns) => Roles)
  async createRole(@Args('roleInput') roleInput: RoleInput) {
    return this.rolesService.createRole(
      roleInput.name,
      roleInput.description,
      roleInput.state,
    );
  }
}
