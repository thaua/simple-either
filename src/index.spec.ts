import * as exported from './index';

describe('Exporting', () => {
  it('exports left and right methods', () => {
    expect(exported.left).toBeDefined();
    expect(exported.right).toBeDefined();
  });
});
