import { Test, TestingModule } from '@nestjs/testing';
import { SubAdminDetailsController } from './company-details.controller';
import { SubAdminDetailsService } from './company-details.service';

describe('CompanyDetailsController', () => {
  let controller: SubAdminDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubAdminDetailsController],
      providers: [SubAdminDetailsService],
    }).compile();

    controller = module.get<SubAdminDetailsController>(SubAdminDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
