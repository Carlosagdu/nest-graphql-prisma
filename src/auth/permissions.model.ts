import { Field, ObjectType} from '@nestjs/graphql';

@ObjectType()
export class Permission {
    @Field(type => Boolean)
    create: boolean

    @Field(type => Boolean)
    read: boolean

    @Field(type => Boolean)
    update: boolean

    @Field(type => Boolean)
    delete: boolean
}