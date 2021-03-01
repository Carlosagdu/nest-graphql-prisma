import { Resolver,  Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './auth.model';
import {SignUpInput} from "./dto/signup.input"

@Resolver((of) => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation( returns => Auth)
  async signup(@Args("data") data: SignUpInput){
    data.email = data.email.toLowerCase();
    const { accessToken, refreshToken } = await this.authService.createUser(data);
    return {
      accessToken,
      refreshToken
    }

  }

}
