import { Test, TestingModule } from '@nestjs/testing';
import { SchoolDetailsService } from './company-details.service';

describe('CompanyDetailsService', () => {
  let service: SchoolDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolDetailsService],
    }).compile();

    service = module.get<SchoolDetailsService>(SchoolDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
