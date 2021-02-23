import { Module } from '@nestjs/common';
import { GraphQLModule} from "@nestjs/graphql"
import { join } from 'path';
import { PostResolver } from './post/post.resolver';
import { PrismaService } from './prisma.service';
import { UserResolver } from './user/user.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(),"src/schema.gql")
    })
  ],
  controllers: [],
  providers: [PrismaService,UserResolver, PostResolver],
})
export class AppModule {}
