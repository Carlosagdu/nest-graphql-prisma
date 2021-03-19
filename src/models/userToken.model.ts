import { Field, ObjectType} from '@nestjs/graphql';
import { User } from '@prisma/client';
import { User as UserModel } from 'src/models/user.model';

@ObjectType({description:"UserToken model"})
export class UserToken {
  @Field()
  token: string

  @Field(type => UserModel)
  user: User
}
