import 'reflect-metadata'
import { ObjectType, Field, ID, InputType } from '@nestjs/graphql'
import { User } from '../user/user.model'

@ObjectType()
export class Post {
  @Field((type) => ID)
  id: number

  @Field()
  title: string

  @Field((type) => String, { nullable: true })
  content: string | null

  @Field((type) => Boolean, { nullable: true })
  published?: boolean | null

  @Field((type) => User, { nullable: true })
  author?: User | null
}

