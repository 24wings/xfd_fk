import { HkModule } from './hk.module';

describe('HkModule', () => {
  let hkModule: HkModule;

  beforeEach(() => {
    hkModule = new HkModule();
  });

  it('should create an instance', () => {
    expect(hkModule).toBeTruthy();
  });
});
