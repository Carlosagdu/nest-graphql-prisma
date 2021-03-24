import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { create } from 'node:domain';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MenuService {
  constructor(private readonly prismaService: PrismaService) {}

  userField = async (menuId: number) => {
    return this.prismaService.menu
      .findUnique({
        where: {
          id: menuId,
        },
      })
      .user();
  };

  getAllMenus = async () => {
    return this.prismaService.menu.findMany({
      select: {
        id: true,
        menuSections: {
          select:{
            title: true,
            members: {
              select: {
                name: true
              }
            }
          }
        },
      },
    });
  };

  getMenuByUserId = async (userId: number) => {
    return this.retrieveMenuByUserId(userId);
  };

  createMenu = async (userId: number) => {
    return this.prismaService.menu.create({
      data: {
        user:{
          connect:{
            id: userId
          }
        }
      },
      select: {
        id: true,
        menuSections: true,
      },
    });
  };

  createSection = async (menuId: number, title: string) => {
    await this.prismaService.menuSection.create({
      data: {
        title: title,
        menu: {
          connect: { id: menuId },
        },
      },
    });

    return this.prismaService.menu.findUnique({
      where: {
        id: menuId,
      },
      select: {
        id: true,
        menuSections: {
          select:{
            title: true,
          }
        }
      },
    });
  };

  insertMembers = async (
    userId: number,
    menuSectionId: number,
    member: string,
  ) => {
    const availableEntities = await this.prismaService.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .Permissions({
        select: {
          access: true,
        },
      });
    if (!availableEntities.access.includes(member)) {
      throw new UnauthorizedException(
        `User doesn't have access to this entity`,
      );
    }
    // Save the member to the menusection
    await this.prismaService.member.create({
      data: {
        name: member,
        menuSection: {
          connect: {
            id: menuSectionId,
          },
        },
      },
    });

    return this.retrieveMenuByUserId(userId);
  };

  retrieveMenuByUserId = async (userId: number) => {
    return this.prismaService.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .menu({
        select: {
          id: true,
          menuSections: {
            select: {
              title: true,
              members: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
  };
}
