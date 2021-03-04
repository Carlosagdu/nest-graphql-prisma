import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt} from 'passport-jwt';
import { AuthService } from '../auth.service';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }

  validate = async (payload) => {
    const user = await this.authService.validateUser(payload.id);
    if(!user){
        throw new UnauthorizedException()
    }
    return user
  };
}
