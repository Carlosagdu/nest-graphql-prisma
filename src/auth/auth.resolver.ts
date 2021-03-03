import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UserToken } from './userToken.model';
import { SignUpInput } from './dto/signup.input';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginInput } from './dto/login.input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation((returns) => UserToken)
  @UsePipes(ValidationPipe)
  signup(
    @Args('signUpInput') signUpInput: SignUpInput,
    @Context() res: Response,
  ) {
    signUpInput.email = signUpInput.email.toLowerCase();
    return this.authService.signUp(signUpInput, res);
  }

  @Mutation((returns) => UserToken)
  @UsePipes(ValidationPipe)
  login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() res: Response,
  ) {
    return this.authService.login(loginInput, res)
  }
}
