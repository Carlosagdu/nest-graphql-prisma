import {
  Args,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { Menu } from 'src/models/menu.model';
import { MenuService } from './menu.service';

@Resolver(Menu)
export class MenuResolver {
  constructor(private readonly menuService: MenuService) {}

  @ResolveField()
  async user(@Root() menu: Menu) {
    return this.menuService.userField(menu.id);
  }

  @Query((returns) => [Menu])
  async menus() {
    return this.menuService.getAllMenus();
  }

  @Query((returns) => Menu)
  async menuByUserId(@Args('userId') userId: number) {
    return this.menuService.getMenuByUserId(userId);
  }

  @Mutation((returns) => Menu)
  async createMenu(@Args('userId') userId: number) {
    return this.menuService.createMenu(userId);
  }

  @Mutation((returns) => Menu)
  async createSectionName(
    @Args('menuId') menuId: number,
    @Args('title') title: string,
  ) {
    return this.menuService.createSection(menuId, title);
  }

  @Mutation((returns) => Menu)
  async insertMember(
    @Args('userId') userId: number,
    @Args('sectionId') sectionId: number,
    @Args('members') member: string,
  ) {
    return this.menuService.insertMembers(userId, sectionId ,member)
  }
}
