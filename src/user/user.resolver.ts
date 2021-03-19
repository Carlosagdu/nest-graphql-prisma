import {
  Args,
  Context,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { User} from '../models/user.model';
import {
  Inject, UseGuards
} from '@nestjs/common';
import { Post } from 'src/models/post.model';
import { UserService } from './user.service';
import { GqlAuthGuard } from 'src/auth/guards/graphql.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CurrentUser } from 'src/auth/decorator/currentUser.decorator';

@Resolver((of) => User)
export class UserResolver {
  //Instance of the prisma service
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  //Field resolver
  @ResolveField()
  async posts(@Root() user: User, @Context() ctx): Promise<Post[]> {
    return this.userService.postsField(user.id);
  }

  //Queries resolver
  //users: [User!]!
  @Query((returns) => [User], {
    description: 'It returns all registered users',
  })
  async users(){
    return this.userService.getAllUsers();
  }

  //user(id: Float!): User!
  @Query((returns) => User, { description: 'get one user by id' })
  async user(@Args('id') id: number) {
    return this.userService.getUserById(id);
  }

  //Mutation Resolver
  // deleteUser(id: Float!): User
  @Mutation((returns) => User, {
    description: 'It deletes a user with specific ID',
    nullable: true,
  })
  @UseGuards(GqlAuthGuard,RolesGuard)
  async deleteUser(@Args('id') id: number) {
    return this.userService.deleteUserById(id);
  }
}
