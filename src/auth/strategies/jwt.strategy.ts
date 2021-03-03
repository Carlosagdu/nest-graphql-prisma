import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Strategy} from 'passport-jwt';
import {Request} from "express"
import { AuthService } from '../auth.service';
import { jwtConstants } from '../constants';
import { JwtDto } from '../dto/jwt.dto';

const cookieExtractor = (req:Request) : string | null => {
  let token = null;
  if(req && req.cookies){
    token = req.cookies.token;
  }
  return token;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: jwtConstants.secret,
    });
  }

  validate = async (payload: JwtDto): Promise<User> => {
    const user = await this.authService.validateUser(payload.userId);
    if(!user){
        throw new UnauthorizedException()
    }
    return user
  };
}
