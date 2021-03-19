import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType({description: 'Create role input'})
export class RoleInput{
    @Field()
    @IsString()
    @IsNotEmpty()
    name: string

    @Field()
    @IsString()
    @IsNotEmpty()
    description: string

    @Field()
    state: boolean
}