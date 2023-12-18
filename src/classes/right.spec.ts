import { right } from './right';

describe('Right', () => {
  it('creates a Right instance', () => {
    const testClass = class TestRight {};
    const testResult = new testClass();
    const result = right(testResult);

    expect(result.value).toEqual(testResult);
    expect(result.value).toBeInstanceOf(testClass);
    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
  });
});
