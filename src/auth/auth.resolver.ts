import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserToken } from '../models/userToken.model';
import { SignUpInput } from './dto/signup.input';
import { UseGuards} from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { UserService } from 'src/user/user.service';
import { GqlAuthGuard } from './guards/graphql.guard';
import {User} from "src/models/user.model"
import {CurrentUser} from "./decorator/currentUser.decorator"
import { RolesGuard } from './guards/roles.guard';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
    ) {}

  @Mutation((returns) => UserToken)
  // @UseGuards(GqlAuthGuard, RolesGuard)
  signup(
    @Args('signUpInput') signUpInput: SignUpInput,
  ) {
    signUpInput.email = signUpInput.email.toLowerCase();
    return this.authService.signUp(signUpInput)
  }

  @Mutation((returns) => UserToken)
  login(
    @Args('loginInput') loginInput: LoginInput,
  ) {
    return this.authService.login(loginInput);
  }

  @Query(returns => User)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: User){
    return this.userService.getUserById(user.id)
  }

}
