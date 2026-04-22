import { Test, TestingModule } from '@nestjs/testing';
import { TipopaqueteController } from './tipopaquete.controller';

describe('TipopaqueteController', () => {
  let controller: TipopaqueteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipopaqueteController],
    }).compile();

    controller = module.get<TipopaqueteController>(TipopaqueteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
