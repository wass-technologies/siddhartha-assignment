import { Test, TestingModule } from '@nestjs/testing';
import { SchoolDetailsController } from './company-details.controller';
import { SchoolDetailsService } from './company-details.service';

describe('CompanyDetailsController', () => {
  let controller: SchoolDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolDetailsController],
      providers: [SchoolDetailsService],
    }).compile();

    controller = module.get<SchoolDetailsController>(SchoolDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
