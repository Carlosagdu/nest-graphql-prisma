import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { TreeMenuService } from './tree-menu.service';
describe('TreeMenu service', () => {
  let treeMenuService: TreeMenuService;
  let prismaService: PrismaService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TreeMenuService,
        {
          provide: PrismaService,
          useFactory: () => ({
            treeMenu: {
              findFirst: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn().mockImplementation(()=>({
                treeMenu: jest.fn(()=>{
                  return { path: String}
                })
              })),
              create: jest.fn(()=>{
                return{
                  id: Number,
                }
              }),
              update: jest.fn(),
              delete: jest.fn()
            },
          }),
        },
      ],
    }).compile();

    treeMenuService = module.get<TreeMenuService>(TreeMenuService);
    prismaService = module.get<PrismaService>(PrismaService);
  });
  
  describe('rootTreeMenu method', () => {
    it('should invoke prismaService.treeMenu.findFirst', async () => {
      await treeMenuService.rootTreeMenu();
      expect(prismaService.treeMenu.findFirst).toHaveBeenCalled();
    });
  });
  
  describe('createRootMenu method', ()=> {
    it('should invoke prismaService.treeMenu.create', async()=>{
      await treeMenuService.createRootMenu()
      expect(prismaService.treeMenu.create).toHaveBeenCalled()
    })
  })

  describe('createFolder method',()=>{
    it('should invoke prismaService.treeMenu.create', async()=>{
      const testParams ={
        parentId: 2,
        folderName: 'test folder parent'
      }
      await treeMenuService.createFolder(testParams.parentId, testParams.folderName)
      expect(prismaService.treeMenu.create).toHaveBeenCalled()
    })
  })

  describe('insertEntityToFolder method',()=>{
    it('should invoke prismaService.treeMenu.create', async()=>{
      const testParams = {
        parentId: 4,
        entityName: 'Shipping'
      }
      await treeMenuService.insertEntityToFolder(testParams.parentId, testParams.entityName);
      expect(prismaService.treeMenu.create).toHaveBeenCalled()
    })
  })
});
