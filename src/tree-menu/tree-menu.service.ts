import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TreeMenuService {
  constructor(private prismaService: PrismaService) {}

  subMenuField = async (treeMenuId: number) => {
    return this.prismaService.treeMenu
      .findUnique({
        where: {
          id: treeMenuId,
        },
      })
      .subMenu();
  };

  getTreeMenuById = async (menuId: number) => {
    const menu = await this.prismaService.treeMenu.findUnique({
      where: {
        id: menuId,
      },
      select:{
        id: true,
        title: true,
        path: true,
        isEntity: true,
        subMenu: true,
      }
    });
    return menu
  };

  createRootMenu = async () => {
    return this.prismaService.treeMenu.create({
      data: {
        title: 'menu',
        path: '',
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

    const folderNameWithSlash: string = '/' + folderName

    return await this.updateFolderPath(createdFolder.id, folderNameWithSlash);
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
    const path: string = parent.path + folderName;
    return await this.prismaService.treeMenu.update({
      where: {
        id: folderId,
      },
      data: {
        path: path,
      },
    });
  };
}
