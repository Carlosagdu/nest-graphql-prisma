import {
  Inject,
  UseGuards,
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
import { User } from '../models/user.model';
import { Post } from '../models/post.model';
import {PostInput} from "./dto/createPost.input"
import { PostService } from './post.service';
import { GqlAuthGuard } from 'src/auth/guards/graphql.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Resolver((of) => Post)
export class PostResolver {
  //Instance of the prisma service
  constructor(@Inject(PostService) private readonly postService: PostService) {}

  @ResolveField()
  async author(@Root() post: Post) {
    return this.postService.authorField(post.id);
  }

  //Queries resolver
  //posts: [Post!]!
  @Query((returns) => [Post], {
    description: 'It returns all post',
  })
  async posts(): Promise<Post[]> {
    return this.postService.getAllPosts();
  }

  //post(id: Float!): Post
  @Query((returns) => Post, {
    nullable: true,
    description: 'get post by Id',
  })
  async post(@Args('id') id: number) {
    return this.postService.getPostById(id);
  }


  //Mutation resolver
  //createDraft(draftData: DraftDataInput!): Post
  @Mutation((returns) => Post, {
    description: 'Create a Post',
    nullable: true,
  })
  @UseGuards(GqlAuthGuard, RolesGuard)
  async createPost(
    @Args('postInput') postInput: PostInput,
  ): Promise<Post> {
    return this.postService.createPost(
      postInput.title,
      postInput.body,
      postInput.authorEmail,
    );
  }

  @Mutation((returns) => Post, {
    description: 'It deletes a post with specific ID',
    nullable: true,
  })
  async deletePostById(@Args('id') id: number): Promise<Post> {
    return this.postService.deletePostById(id);
  }
}
