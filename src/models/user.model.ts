import 'reflect-metadata'
import { ObjectType, Field, ID, HideField} from '@nestjs/graphql'
import { Post } from "./post.model"

@ObjectType({description: "User model"})
export class User {
  @Field((type) => ID)
  id: number

  @Field()
  email: string

  @Field((type) => [Post], { nullable: true })
  posts?: [Post] | null

  @HideField()
  password: string

}

