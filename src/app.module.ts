import { Module } from '@nestjs/common';
import { GraphQLModule} from "@nestjs/graphql"
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { GraphqlOptions } from './graphql.options';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GraphqlOptions,
    }),
    AuthModule,
    UserModule,
    PostModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
