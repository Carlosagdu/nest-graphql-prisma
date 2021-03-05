import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserToken } from './userToken.model';
import { SignUpInput } from './dto/signup.input';
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Permission } from './permissions.model';
import {User} from "src/user/user.model"
import {CurrentUser} from "./decorator/currentUser.decorator"

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
    ) {}

  @Mutation((returns) => UserToken)
  @UsePipes(ValidationPipe)
  // @UseGuards(JwtAuthGuard)
  signup(
    @Args('signUpInput') signUpInput: SignUpInput,
  ) {
    signUpInput.email = signUpInput.email.toLowerCase();
    return this.authService.signUp(signUpInput)
  }

  @Mutation((returns) => UserToken)
  @UsePipes(ValidationPipe)
  login(
    @Args('loginInput') loginInput: LoginInput,
  ) {
    return this.authService.login(loginInput);
  }

  @Query(returns => User)
  @UseGuards(JwtAuthGuard)
  whoAmI(@CurrentUser() user: User){
    return this.userService.getUserById(user.id)
  }

  @Query(returns => Permission)
  @UseGuards(JwtAuthGuard)
  permissionIHave(@CurrentUser() user: User){
    return this.authService.permissions(user)
  }
}
