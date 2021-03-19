import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  authorField = async (postId: number) => {
    return this.prismaService.post
      .findUnique({
        where: {
          id: postId,
        },
      })
      .author();
  };

  getAllPosts = async () => {
    return this.prismaService.post.findMany();
  };

  getPostById = async (postId: number) => {
    //Look for a Post where the ID matches
    const foundPost = await this.prismaService.post.findUnique({
      where: { id: postId },
    });
    //If there isn't a foundPost throw not found exception
    if (!foundPost)
      throw new NotFoundException(`Post with ID ${postId} not found`);
    //Otherwise, return the found Post
    return foundPost;
  };

  createPost = async (title: string, body: string, authorEmail: string) => {
    return this.prismaService.post.create({
      data: {
        title: title,
        body: body,
        author: {
          connect: { email: authorEmail },
        },
      },
    });
  };

  deletePostById = async (postId: number) => {
    return this.prismaService.post.delete({
      where: {
        id: postId,
      },
    });
  };
}
