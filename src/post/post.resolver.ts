import {
  NotFoundException,
  Inject,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { PrismaService } from 'src/prisma.service';
import { User } from '../user/user';
import { DraftDataInput, Post } from './post';

@Resolver((of) => Post)
export class PostResolver {
  //Instance of the prisma service
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @ResolveField()
  async author(@Root() post: Post): Promise<User | null> {
    return this.prismaService.post
      .findUnique({
        where: {
          id: post.id,
        },
      })
      .author();
  }

  //Queries resolver
  //posts()
  @Query((returns) => [Post], {
    name: 'posts',
    description: 'It returns all post',
  })
  async getAllPosts(): Promise<Post[]> {
    return this.prismaService.post.findMany();
  }

  //post(id)
  @Query((returns) => Post, {
    name: 'post',
    nullable: true,
    description: 'get post by Id',
  })
  async getPostById(@Args('id') id: number) {
    //Look for a Post where the ID matches
    const foundPost = await this.prismaService.post.findUnique({
      where: { id: id },
    });
    //If there isn't a foundPost throw not found exception
    if (!foundPost) throw new NotFoundException(`Post with ID ${id} not found`);
    //Otherwise, return the found Post
    return foundPost;
  }

  //Display published posts
  @Query((returns) => [Post], {
    description: 'It returns all post where published is true',
    nullable: true,
  })
  async feed(): Promise<Post[]> {
    const foundPosts= await this.prismaService.post.findMany({
      where: {
        published: true,
      },
    });
    //If there aren´t published posts throw not found exception
    if(!foundPosts) throw new NotFoundException("Published posts not found")
    //Otherwise, return the found Posts
    return foundPosts

  }

  //Mutation resolver
  //Create draft
  @Mutation((returns) => Post, {
    description: 'Create a draft for a user',
    nullable: true,
  })
  @UsePipes(ValidationPipe)
  async createDraft(
    @Args('draftData') draftData: DraftDataInput,
    @Context() ctx,
  ): Promise<Post> {
    return this.prismaService.post.create({
      data: {
        title: draftData.title,
        content: draftData.content,
        author: {
          connect: { email: draftData.authorEmail },
        },
      },
    });
  }

  //Publish draft
  @Mutation((returns) => Post, {
    description: 'Enable the published post property to true',
    nullable: true,
  })
  async publish(@Args('id') id: number): Promise<Post | null> {
    return this.prismaService.post.update({
      where: {
        id: id,
      },
      data: {
        published: true,
      },
    });
  }
}
