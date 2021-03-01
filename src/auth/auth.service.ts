import { Injectable } from '@nestjs/common';
import { SignUpInput } from './dto/signup.input';
import { PasswordService } from './password.service';
import {Token} from "./token.model"

@Injectable()
export class AuthService {
  constructor(private readonly passwordService:PasswordService){}
  
  createUser = async(payload: SignUpInput): Promise<Token> =>{
    // const hashedPassword = await

  }

}
