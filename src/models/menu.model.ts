import { Field, ID, ObjectType } from "@nestjs/graphql";
import JSON from "graphql-type-json"
import { User } from "./user.model";

@ObjectType({description: "Menu Model"})
export class Menu{
    @Field(type => ID)
    id: number

    @Field(type=> [JSON])
    menuSections: [JSON]

    @Field(type => User)
    user: User
}