import {
  Args,
  Context,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { User} from './user';
import { PrismaService } from '../prisma.service';
import {
  Inject,
  NotFoundException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Post } from 'src/post/post';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  //Instance of the prisma service
  constructor(@Inject(UserService) private userService: UserService) {}

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

  //Mutation resolver
  //signUpUser(data: SignUpUserInput): User
  // @Mutation((returns) => User, {
  //   description: 'Create a new user',
  //   nullable: true,
  // })
  // @UsePipes(ValidationPipe)
  // async signUpUser(
  //   //argument from the query must be SignUpUser type
  //   @Args('data') data: SignUpUserInput,
  //   @Context() ctx,
  // ): Promise<User> {
  //   return this.prismaService.user.create({
  //     data: {
  //       email: data.email,
  //       name: data.name,
  //     },
  //   });
  // }

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
