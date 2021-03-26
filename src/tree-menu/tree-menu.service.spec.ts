import { Test, TestingModule } from '@nestjs/testing';
import { TreeMenuService } from './tree-menu.service';

describe('TreeMenuService', () => {
  let service: TreeMenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TreeMenuService],
    }).compile();

    service = module.get<TreeMenuService>(TreeMenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
