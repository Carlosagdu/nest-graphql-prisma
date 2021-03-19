import { ObjectType, Field, ID } from "@nestjs/graphql"
import { Roles } from "./roles.model"
import {Route} from "./route.model"

@ObjectType({description:"RoutesRoles model"})
export class RoutesRoles{
    @Field(type => ID)
    id: number

    @Field(type => Route)
    route: Route

    @Field(type => Roles)
    roles: Roles

    @Field(type=> Boolean)
    state: Boolean
}