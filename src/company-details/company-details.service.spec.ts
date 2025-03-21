import { Test, TestingModule } from '@nestjs/testing';
import { SubAdminDetailsService } from './company-details.service';

describe('CompanyDetailsService', () => {
  let service: SubAdminDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubAdminDetailsService],
    }).compile();

    service = module.get<SubAdminDetailsService>(SubAdminDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
