import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "./user.model";

@ObjectType({description: "Permission model"})
export class Permission {
    @Field(type => ID)
    id: number

    @Field(type => [String] )
    access: [string]

    @Field(type => User)
    user: User
}