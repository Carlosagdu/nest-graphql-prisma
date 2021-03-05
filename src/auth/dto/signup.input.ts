import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Role } from 'src/user/user.model';

@InputType({ description: 'New User Input' })
export class SignUpInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;
  
  @Field(type => Role, {nullable: true})
  @IsOptional()
  @IsEnum(Role)
  role: Role
}
