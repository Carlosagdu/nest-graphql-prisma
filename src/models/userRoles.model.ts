import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "src/models/user.model";
import { Roles } from "./roles.model";

@ObjectType({description: "UserRoles model"})
export class UserRoles{
    @Field(type => ID)
    id: number

    @Field(type => User)
    user: User

    @Field(type => Roles)
    roles: Roles

    @Field(type=> Boolean)
    state: Boolean
}