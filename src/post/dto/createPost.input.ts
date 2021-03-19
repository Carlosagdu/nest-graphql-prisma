import { Field, InputType } from "@nestjs/graphql"
import { IsEmail, IsNotEmpty } from "class-validator"

@InputType({description:"New post input"})
export class PostInput {
  @Field({nullable: false})
  @IsNotEmpty()
  title: string
  
  @Field( type => String)
  body: string

  @Field( type => String, {nullable: false})
  @IsEmail()
  authorEmail: string

}