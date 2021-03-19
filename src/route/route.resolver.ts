import { Args, Mutation, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { Route } from 'src/models/route.model';
import { RouteInput } from './dto/createroute.input';
import { RouteService } from './route.service';

@Resolver(Route)
export class RouteResolver {
  constructor(private readonly routeService: RouteService) {}

  @Query(returns => [Route])
  async routes(){
    return this.routeService.getAllRoutes();
  }

  @Mutation(returns => Route)
  async createRoute(@Args('routeInput') routeInput: RouteInput){
    return this.routeService.createRoute(routeInput.route, routeInput.state);
  }
}
