import { TreeMenuResolver } from './tree-menu.resolver';
import { TreeMenuService } from './tree-menu.service';
import { Test } from '@nestjs/testing';

describe('treeMenu Resolver', () => {
  let treeMenuResolver: TreeMenuResolver;
  let treeMenuService: TreeMenuService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TreeMenuResolver,
        {
          provide: TreeMenuService,
          useFactory: () => ({
            rootTreeMenu: jest.fn(),
            createRootMenu: jest.fn(),
            createFolder: jest.fn(),
            insertEntityToFolder: jest.fn(),
            filterMenu: jest.fn()
          }),
        },
      ],
    }).compile();

    treeMenuResolver = module.get<TreeMenuResolver>(TreeMenuResolver);
    treeMenuService = module.get<TreeMenuService>(TreeMenuService);
  });

  describe('Query rootTreeMenu()', () => {
    it('should invoke treeMenuService.rootTreeMenu()', async () => {
      await treeMenuResolver.rootTreeMenu();
      expect(treeMenuService.rootTreeMenu).toHaveBeenCalled();
    });
  });

  describe('Mutation createRootMenu()', () => {
    it('should invoke treeMenuService.createRootMenu', async () => {
      await treeMenuResolver.createRootMenu();
      expect(treeMenuService.createRootMenu).toHaveBeenCalled();
    });
  });

  describe('Mutation createFolder()', () => {
    it('should invoke treeMenuService.createFolder with arguments', async () => {
      const testParams = {
        parentId: 3,
        folderName: 'test folder',
      };
      await treeMenuResolver.createFolder(
        testParams.parentId,
        testParams.folderName,
      );
      expect(treeMenuService.createFolder).toHaveBeenCalledWith(
        testParams.parentId,
        testParams.folderName,
      );
    });
  });

  describe('Mutation insertEntityToFolder()',()=>{
    it('should invoke treeMenuService.insertEntityToFolder with arguments', async()=>{
      const testParams = {
        parentId: 5,
        entityName: 'Shipping',
      };
      await treeMenuResolver.insertEntityToFolder(testParams.parentId, testParams.entityName)
      expect(treeMenuService.insertEntityToFolder).toHaveBeenCalledWith(testParams.parentId, testParams.entityName)
    })
  })

  describe('Query filteredMenuForUserId', ()=>{
    it('should invoke treeMenuService.filterMenu with arguments', async()=>{
      const testUserIdParam: number = 5
      await treeMenuResolver.filteredMenuForUserId(testUserIdParam)
      expect(treeMenuService.filterMenu).toHaveBeenCalledWith(testUserIdParam)
    })
  })
});
