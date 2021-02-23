import 'reflect-metadata'
import { ObjectType, Field, ID, InputType } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'
import { Post } from "../post/post"

@ObjectType()
export class User {
  @Field((type) => ID)
  id: number

  @Field()
  @IsEmail()
  email: string

  @Field((type) => String, { nullable: true })
  name?: string | null

  @Field((type) => [Post], { nullable: true })
  posts?: [Post] | null
}

@InputType({description:"New User Input"})
export class SignUpUserInput{
    @Field()
    name: string

    @Field()
    @IsEmail()
    email: string    
}