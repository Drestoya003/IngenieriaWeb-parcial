import { UseRoleGuard } from './use-role.guard';

describe('UseRoleGuard', () => {
  it('should be defined', () => {
    expect(new UseRoleGuard()).toBeDefined();
  });
});
