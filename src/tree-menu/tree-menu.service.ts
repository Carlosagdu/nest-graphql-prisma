import { treeMenu } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TreeMenuService {
  constructor(private prismaService: PrismaService) {}

  rootTreeMenu = async ()=> {
    return await this.prismaService.treeMenu.findFirst({
      where: {
        treeMenuId: null
      },
      include: {
        subMenu:{
          include: {
            subMenu: {
              include: {
                subMenu: {
                  include: {
                    subMenu: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  };

  createRootMenu = async () => {
    return this.prismaService.treeMenu.create({
      data: {
        title: 'menu',
        path: '/',
        isEntity: false,
        treeMenuId: null,
      },
    });
  };

  createFolder = async (parentId: number, folderName: string) => {
    await this.doesParentFolderExist(parentId);
    const createdFolder = await this.prismaService.treeMenu.create({
      data: {
        title: folderName,
        isEntity: false,
        path: '',
        treeMenu: {
          connect: {
            id: parentId,
          },
        },
      },
    });

    return await this.updateFolderPath(createdFolder.id, folderName);
  };

  insertEntityToFolder = async (parentId: number, entityName: string) => {
    const createdEntity = await this.prismaService.treeMenu.create({
      data: {
        title: entityName,
        isEntity: true,
        path: '',
        treeMenu: {
          connect: {
            id: parentId,
          },
        },
      },
    });
    return await this.updateFolderPath(createdEntity.id, entityName);
  };

  doesParentFolderExist = async (parentId: number) => {
    const parentFolder = await this.prismaService.treeMenu.findUnique({
      where: {
        id: parentId,
      },
    });
    if (!parentFolder) {
      throw new NotFoundException(`Folder with id: ${parentId} does not exist`);
    }
  };

  updateFolderPath = async (folderId: number, folderName: string) => {
    let path: string;
    const parent = await this.prismaService.treeMenu
      .findUnique({
        where: {
          id: folderId,
        },
      })
      .treeMenu({
        select: {
          path: true,
        },
      });
    if (parent.path === '/') {
      path = parent.path + folderName;
    } else {
      path = parent.path + '/' + folderName;
    }
    return await this.prismaService.treeMenu.update({
      where: {
        id: folderId,
      },
      data: {
        path: path,
      },
    });
  };

  filterMenu = async (userId: number): Promise<treeMenu> => {
    const permissions = await this.prismaService.permissions.findMany({
      where: {
        userId: userId,
      },
      select: {
        access: true,
      },
    });
    const filteredMenu = await this.prismaService.treeMenu.findUnique({
      where: {
        id: 1,
      },
      select: {
        id: true,
        title: true,
        path: true,
        isEntity: true,
        treeMenuId: true,
        subMenu: {
          select: {
            id: true,
            title: true,
            path: true,
            isEntity: true,
            subMenu: {
              where: {
                OR: [
                  {
                    title:{
                      in: permissions[0].access
                    }
                  },
                  { isEntity: false }
                ],
              },
              select: {
                id: true,
                title: true,
                path: true,
                isEntity: true,
                subMenu: {
                  where: {
                    title: { in: permissions[0].access },
                  },
                },
              },
            },
          },
        },
      },
    });
    return filteredMenu;
  };
}
