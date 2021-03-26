import { Field, ID, ObjectType } from "@nestjs/graphql";
import JSON from "graphql-type-json"

@ObjectType({description:"Tree Menu Model "})
export class TreeMenu{
    @Field(type => ID)
    id: number

    @Field()
    title: string

    @Field()
    path: string 

    @Field()
    isEntity: boolean

    @Field(type => JSON)
    subMenu: [JSON]
}