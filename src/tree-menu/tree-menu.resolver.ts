import { Args, Mutation, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { TreeMenu } from 'src/models/treeMenu.model';
import { TreeMenuService } from './tree-menu.service';

@Resolver(TreeMenu)
export class TreeMenuResolver {
  constructor(private readonly treeMenuService: TreeMenuService) {}

  // @ResolveField()
  // async subMenu(@Root()treeMenu: TreeMenu){
  //   return this.treeMenuService.subMenuField(treeMenu.id)
  // }

  @Query(returns => TreeMenu)
  async treeMenusById(@Args('menuId')menuId: number) {
    return this.treeMenuService.getTreeMenuById(menuId);
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
