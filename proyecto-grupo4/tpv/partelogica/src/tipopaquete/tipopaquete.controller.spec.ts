import { Test, TestingModule } from '@nestjs/testing';
import { tipopaquetecontroller } from './tipopaquete.controller';

describe('TipopaqueteController', () => {
  let controller: tipopaquetecontroller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [tipopaquetecontroller],
    }).compile();

    controller = module.get<tipopaquetecontroller>(tipopaquetecontroller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
