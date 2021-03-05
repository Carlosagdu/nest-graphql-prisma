import 'reflect-metadata'
import { ObjectType, Field, ID, HideField, registerEnumType } from '@nestjs/graphql'
import { Post } from "../post/post.model"

export enum Role {
  ADMINISTRATOR="ADMINISTRATOR",
  MANAGER="MANAGER",
  SUPERVISOR="SUPERVISOR",
  EMPLOYEE="CLOSED"
}

registerEnumType(Role, {
  name: "Role",
  description: "Allowed roles for users"
})

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

  @Field(type => Role)
  role: Role
}

