import { Test, TestingModule } from '@nestjs/testing';
import { TreeMenuResolver } from './tree-menu.resolver';
import { TreeMenuService } from './tree-menu.service';

describe('TreeMenuResolver', () => {
  let resolver: TreeMenuResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TreeMenuResolver, TreeMenuService],
    }).compile();

    resolver = module.get<TreeMenuResolver>(TreeMenuResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
