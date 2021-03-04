import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class GraphqlOptions implements GqlOptionsFactory{
    createGqlOptions(): Promise<GqlModuleOptions> | GqlModuleOptions{
        return{
            autoSchemaFile: join(process.cwd(), "src/schema.gql"),
        }
    }
}