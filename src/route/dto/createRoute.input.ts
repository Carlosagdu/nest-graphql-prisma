import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsNotEmpty } from "class-validator";

@InputType()
export class RouteInput{
    @Field()
    @IsNotEmpty()
    route: string

    @Field()
    @IsBoolean()
    state: boolean
}