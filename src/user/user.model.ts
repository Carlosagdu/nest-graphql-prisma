import 'reflect-metadata'
import { ObjectType, Field, ID, HideField } from '@nestjs/graphql'
import { Post } from "../post/post.model"

@ObjectType()
export class User {
  @Field((type) => ID)
  id: number

  @Field()
  email: string

  @Field((type) => String, { nullable: true })
  name?: string | null

  @Field((type) => [Post], { nullable: true })
  posts?: [Post] | null

  @HideField()
  password: string
}


