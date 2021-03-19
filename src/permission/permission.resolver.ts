import {
  Args,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { Permission } from 'src/models/permission.model';
import { PermissionService } from './permission.service';

@Resolver(Permission)
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @ResolveField()
  async user(@Root() permission: Permission) {
    return this.permissionService.userField(permission.id);
  }

  @Query((returns) => [Permission])
  async permissions() {
    return this.permissionService.getAllPermissions();
  }

  @Query((returns) => Permission)
  async permissionById(@Args('id') id: number) {
    return this.permissionService.getPermissionById(id);
  } 
  
  @Mutation(returns => Permission)
  async assignPermissionToUser(
    @Args('userId') userId: number
  ){
    return this.permissionService.assignPermissionToUser(userId);
  }
}
