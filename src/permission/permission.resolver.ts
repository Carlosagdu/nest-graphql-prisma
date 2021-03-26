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

  @Query((returns) => Permission)
  async permissionByUserId(@Args('userId') userId: number) {
    return this.permissionService.getPermissionByUserId(userId);
  }

  @Mutation((returns) => Permission)
  async assignPermissionToUser(@Args('userId') userId: number) {
    return this.permissionService.assignPermissionToUser(userId);
  }
}
