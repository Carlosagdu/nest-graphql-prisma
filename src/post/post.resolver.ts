import { Inject } from '@nestjs/common';
import { Args, Context, Mutation, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma.service';
import { User } from '../user/user';
import { DraftDataInput, Post, } from './post';

@Resolver(of=> Post)
export class PostResolver {
    //Instance of the prisma service
    constructor(@Inject(PrismaService) private prismaService: PrismaService){}

    @ResolveField()
    async author(@Root() post:Post): Promise<User | null>{
        return this.prismaService.post.findUnique({
            where: {
                id: post.id
            }
        }).author()
    }

    //Queries resolver
    //posts()
    @Query( returns => [Post], {name: "posts", description: "It returns all post published"})
    async getAllPosts(): Promise<Post[]>{
        return this.prismaService.post.findMany();
    }

    //post(id)
    @Query((returns) => Post, { name: "post", nullable: true, description: "get post by Id" })
    async getPostById(@Args('id') id: number) {
    return this.prismaService.post.findUnique({
      where: { id: id},
    })
    }

    //Display published posts
    @Query(returns => [Post], {nullable: true})
    async feed(): Promise<Post[]> {
        return this.prismaService.post.findMany({
            where: {
                published: true,
            }
        })
    }

    //Mutation resolver
    //Create draft
    @Mutation( returns => Post, { nullable: true})
    async createDraft(
        @Args("draftData") draftData: DraftDataInput,
        @Context() ctx) : Promise<Post>
    {
        return this.prismaService.post.create({
            data: {
                title: draftData.title,
                content: draftData.content,
                author: {
                    connect: {email: draftData.authorEmail}
                }
            }
        })
    }

    //Publish draft
    @Mutation( returns => Post, {nullable: true})
    async publish(@Args("id") id: number): Promise<Post | null>{
        return this.prismaService.post.update({
            where:{
                id: id
            },
            data: {
                published: true,
            }
        })
    }

}
