import { ObjectType, Field, ID, } from '@nestjs/graphql'

@ObjectType({description: "Role model"})
export class Roles {
  @Field((type) => ID)
  id: number

  @Field(type => String)
  name: string

  @Field(type => String, {nullable: true})
  description: string

  @Field(type => Boolean)
  state: Boolean

}