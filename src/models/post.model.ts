import 'reflect-metadata'
import { ObjectType, Field, ID, InputType } from '@nestjs/graphql'
import { User } from './user.model'

@ObjectType({description: "Post model"})
export class Post {
  @Field((type) => ID)
  id: number

  @Field()
  title: string

  @Field((type) => String, { nullable: true })
  body: string | null

  @Field((type) => User, { nullable: true })
  author?: User | null
}

