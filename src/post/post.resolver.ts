import {
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
import { User } from '../user/user.model';
import { Post } from './post.model';
import {DraftDataInput} from "./dto/draftdata.input"
import { PostService } from './post.service';

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

  //feed: [Post!]
  @Query((returns) => [Post], {
    description: 'It returns all post where published is true',
    nullable: true,
  })
  async feed(): Promise<Post[]> {
    return this.postService.getPublishedPosts();
  }

  //Mutation resolver
  //createDraft(draftData: DraftDataInput!): Post
  @Mutation((returns) => Post, {
    description: 'Create a draft for a user',
    nullable: true,
  })
  async createDraft(
    @Args('draftData') draftData: DraftDataInput,
  ): Promise<Post> {
    return this.postService.createDraft(
      draftData.title,
      draftData.content,
      draftData.authorEmail,
    );
  }

  //publish(id: Float!): Post
  @Mutation((returns) => Post, {
    description: 'Enable the published post property to true',
    nullable: true,
  })
  async publish(@Args('id') id: number): Promise<Post | null> {
    return this.postService.publish(id);
  }

  @Mutation((returns) => Post, {
    description: 'It deletes a post with specific ID',
    nullable: true,
  })
  async deletePostById(@Args('id') id: number): Promise<Post> {
    return this.postService.deletePostById(id);
  }
}
