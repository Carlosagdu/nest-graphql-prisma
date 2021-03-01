import { Field, InputType } from "@nestjs/graphql"
import { IsEmail, IsNotEmpty } from "class-validator"

@InputType({description:"New Draft Input"})
export class DraftDataInput {
  @Field({nullable: false})
  @IsNotEmpty()
  title: string
  
  @Field( type => String)
  content: string

  @Field( type => String, {nullable: false})
  @IsEmail()
  authorEmail: string

}