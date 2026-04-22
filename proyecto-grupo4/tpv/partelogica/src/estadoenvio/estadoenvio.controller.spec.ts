import { Test, TestingModule } from '@nestjs/testing';
import { EstadoEnvioController } from './estadoenvio.controller';

describe('EstadoEnvioController', () => {
  let controller: EstadoEnvioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstadoEnvioController],
    }).compile();

    controller = module.get<EstadoEnvioController>(EstadoEnvioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
