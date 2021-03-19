import { ObjectType, Field, ID } from "@nestjs/graphql"

@ObjectType({description: "Route model"})
export class Route{
    @Field(type => ID)
    id: number

    @Field(type => String)
    route: String

    @Field(type=> Boolean)
    state: Boolean
}