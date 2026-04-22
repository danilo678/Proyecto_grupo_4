import { Test, TestingModule } from '@nestjs/testing';
import { EstadoEnvioService } from './estadoenvio.service';

describe('EstadoEnvioService', () => {
  let service: EstadoEnvioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstadoEnvioService],
    }).compile();

    service = module.get<EstadoEnvioService>(EstadoEnvioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
