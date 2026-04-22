import { Test, TestingModule } from '@nestjs/testing';
import { TipopaqueteService } from './tipopaquete.service';

describe('TipopaqueteService', () => {
  let service: TipopaqueteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipopaqueteService],
    }).compile();

    service = module.get<TipopaqueteService>(TipopaqueteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
