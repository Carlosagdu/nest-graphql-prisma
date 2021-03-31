import { Args, Mutation, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { TreeMenu } from 'src/models/treeMenu.model';
import { TreeMenuService } from './tree-menu.service';

@Resolver(TreeMenu)
export class TreeMenuResolver {
  constructor(private readonly treeMenuService: TreeMenuService) {}

  @Query(returns => TreeMenu)
  async rootTreeMenu() {
    return this.treeMenuService.rootTreeMenu();
  }

  @Mutation(returns => TreeMenu)
  async createRootMenu(){
    return this.treeMenuService.createRootMenu()
  }

  @Mutation(returns => TreeMenu)
  async createFolder(
    @Args('parentId')parentId: number,
    @Args('folderName')folderName: string
  ){
    return this.treeMenuService.createFolder(parentId, folderName)
  }

  @Mutation(returns => TreeMenu)
  async insertEntityToFolder(
    @Args('parentId')parentId: number,
    @Args('entityName')entityName: string
    ){
    return this.treeMenuService.insertEntityToFolder(parentId, entityName)
  }

  @Query(returns => TreeMenu)
  async filteredMenuForUserId(
    @Args('userId')userId: number
  ){
    return this.treeMenuService.filterMenu(userId)
  }
}
