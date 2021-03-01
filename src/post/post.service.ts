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

  getPublishedPosts = async () => {
    const foundPosts = await this.prismaService.post.findMany({
      where: {
        published: true,
      },
    });
    //If there aren´t published posts throw not found exception
    if (!foundPosts) throw new NotFoundException('Published posts not found');
    //Otherwise, return the found Posts
    return foundPosts;
  };

  createDraft = async (title: string, content: string, authorEmail: string) => {
    return this.prismaService.post.create({
      data: {
        title: title,
        content: content,
        author: {
          connect: { email: authorEmail },
        },
      },
    });
  };

  publish = async (postId: number) => {
    return this.prismaService.post.update({
      where: {
        id: postId,
      },
      data: {
        published: true,
      },
    });
  };

  deletePostById = async (postId: number) => {
    return this.prismaService.post.delete({
        where: {
          id: postId,
        },
      });
  }
}
