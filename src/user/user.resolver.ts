import {
  Args,
  Context,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { User} from './user.model';
import {
  Inject,
} from '@nestjs/common';
import { Post } from 'src/post/post.model';
import { UserService } from './user.service';

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
  async users(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  //user(id: Float!): User!
  @Query((returns) => User, { description: 'get one user by id' })
  async user(@Args('id') id: number, @Context() ctx): Promise<User> {
    return this.userService.getUserById(id);
  }

  //Mutation Resolver
  //deleteUser(id: Float!): User
  @Mutation((returns) => User, {
    description: 'It deletes a user with specific ID',
    nullable: true,
  })
  async deleteUser(@Args('id') id: number, @Context() ctx): Promise<User> {
    return this.userService.deleteUserById(id);
  }
}
