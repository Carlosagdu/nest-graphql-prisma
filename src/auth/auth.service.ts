import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { SignUpInput } from './dto/signup.input';
import { PasswordService } from './password.service';
import { UserToken } from './userToken.model';
import { LoginInput } from './dto/login.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  signUp = async (input: SignUpInput, res): Promise<UserToken> => {
    const foundUser = await this.lookForUserByEmail(input.email);
    if(foundUser){
      throw new BadRequestException(`The email ${input.email} is already in use`)
    }

    const hashedPassword = await this.passwordService.hashPassword(
      input.password,
    );

    const createdUser = await this.prismaService.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: hashedPassword,
      },
    });

    const jwt = this.jwtService.sign({ id: createdUser.id });
    res.cookie('token', jwt, { httpOnly: true });

    return { user: createdUser, token: jwt };
  };

  validateUser = (userId: number): Promise<User> => {
    return this.prismaService.user.findUnique({ where: { id: userId } });
  };

  lookForUserByEmail = async (userEmail: string):Promise<User> => {
    return this.prismaService.user.findUnique({
      where: { email: userEmail },
    });
  };

  login = async (input: LoginInput, res): Promise<UserToken> => {
    const foundUser = await this.lookForUserByEmail(input.email);
    if(!foundUser){
      throw new NotFoundException(`This email is not registered`)
    }

    const IsPasswordValid = await this.passwordService.comparePassword(input.password, foundUser.password )
    if(!IsPasswordValid){
      throw new Error('Password is incorrect')
    }

    const jwt = this.jwtService.sign({id: foundUser.id});
    res.cookie('token', jwt , { httpOnly: true });

    return {user: foundUser, token: jwt}

  };
}
