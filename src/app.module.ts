import { Module, ValidationPipe } from '@nestjs/common';
import { GraphQLModule} from "@nestjs/graphql"
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { GraphqlOptions } from './graphql.options';
import { APP_PIPE } from '@nestjs/core';
import { PermissionModule } from './permission/permission.module';
import { RolesModule } from './roles/roles.module';
import { UserRolesModule } from './user-roles/user-roles.module';
import { RouteModule } from './route/route.module';
import { RoutesRolesModule } from './routes-roles/routes-roles.module';
import { TreeMenuModule } from './tree-menu/tree-menu.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GraphqlOptions,
    }),
    AuthModule,
    UserModule,
    PostModule,
    PermissionModule,
    RolesModule,
    UserRolesModule,
    RouteModule,
    RoutesRolesModule,
    TreeMenuModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },
    PrismaService
  ],
})
export class AppModule {}
