import { Either } from '../types/either.type';
import { left } from './left';

class TestLeft {}

describe('Left', () => {
  const testClass = class TestLeft {};
  const testResult = new testClass();
  let result: Either<TestLeft, never>;

  beforeEach(() => {
    result = left(testResult);
  });

  it('creates a Left instance', () => {
    const testClass = class TestLeft {};
    const testResult = new testClass();
    const result = left(testResult);

    expect(result.value).toEqual(testResult);
    expect(result.value).toBeInstanceOf(testClass);
    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
  });

  it('calls the match method for Left', () => {
    const leftMethod = jest.fn();
    const rightMethod = jest.fn();

    result.match(leftMethod, rightMethod);

    expect(leftMethod).toHaveBeenCalled();
    expect(rightMethod).not.toHaveBeenCalled();
  });

  it('calls the map method for Left', () => {
    const rightMethod = jest.fn();

    const mappedResult: boolean = result.map<boolean>((value) => {
      return true;
    }, rightMethod);

    expect(rightMethod).not.toHaveBeenCalled();
    expect(mappedResult).toEqual(true);
  });
});
