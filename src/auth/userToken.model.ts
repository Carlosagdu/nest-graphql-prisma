import { Field, ObjectType} from '@nestjs/graphql';
import { User } from '@prisma/client';
import { User as UserModel } from 'src/user/user.model';

@ObjectType()
export class UserToken {
  @Field()
  token: string

  @Field(type => UserModel)
  user: User
}
