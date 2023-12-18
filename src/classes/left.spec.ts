import { left } from './left';

describe('Left', () => {
  it('creates a Left instance', () => {
    const testClass = class Test {};
    const testResult = new testClass();
    const result = left(testResult);

    expect(result.value).toEqual(testResult);
    expect(result.value).toBeInstanceOf(testClass);
    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
  });
});
