import { IsClientGuard } from './is-client.guard';

describe('IsClientGuard', () => {
  it('should be defined', () => {
    expect(new IsClientGuard()).toBeDefined();
  });
});
