import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  postsField = async (userId: number) => {
    return this.prismaService.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .posts();
  };

  getAllUsers = async () => {
    return this.prismaService.user.findMany();
  };

  getUserById = async (id: number) => {
    //Look for a user where the ID matches
    const userFound = await this.prismaService.user.findUnique({
      where: { id: id },
    });
    //if there isn´t an user, throw not found exception
    if (!userFound)
      throw new NotFoundException(`User with ID ${id} not found.`);
    //otherwise, retrieve the found user
    return userFound;
  };

  deleteUserById = async (id: number) => {
    const deletedUser = this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
    //If there's no user throw not found exception
    if (!deletedUser)
      throw new NotFoundException(`The user with ID ${id} doesn't exit.`);
    //Otherwise, retrieve the user deleted
    return deletedUser;
  };
}
