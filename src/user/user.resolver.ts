import { Args, Context, Mutation, Query, ResolveField, Resolver, Root } from "@nestjs/graphql";
import { User, SignUpUserInput } from './user';
import {PrismaService} from "../prisma.service"
import { Inject, NotFoundException, UsePipes, ValidationPipe } from "@nestjs/common";
import { Post } from "src/post/post";

@Resolver(of => User)
export class UserResolver {
    //Instance of the prisma service
    constructor(@Inject(PrismaService)private prismaService:PrismaService){}
    
    //Field resolver
    @ResolveField()
    async posts(@Root() user: User, @Context() ctx): Promise<Post[]>{
        return this.prismaService.user.findUnique({
            where: {
                id: user.id
            }
        })
        .posts()
    }
    
    //Queries resolver
    //users()
    @Query(returns => [User], { name:"users", description:"It returns all registered users"})
    async getAllUsers() : Promise<User[]> {
        return this.prismaService.user.findMany();
    }

    //user(id)
    @Query(returns => User, {name: "user", description: "get one user by id"})
    async getUserById(
        @Args("id") id: number,
        @Context() ctx
    ): Promise<User>{
        //Look for a user where the ID matches
        const userFound = await this.prismaService.user.findUnique(
            {
                where: { id: id}
            }
        );
        //if there isn´t an user, throw not found exception
        if(!userFound) throw new NotFoundException(`User with ID ${id} not found.`)
        //otherwise, retrieve the found user
        return userFound;
    }

    //Mutation resolver
    @Mutation(returns => User, {description: "Create a new user"})
    @UsePipes(ValidationPipe)
    async signUpUser(
        //argument from the query must be SignUpUser type
        @Args("data") data: SignUpUserInput, 
        @Context() ctx): Promise<User>
    {
        return this.prismaService.user.create({
            data: {
                email: data.email,
                name: data.name
            }
        })
    }

}
