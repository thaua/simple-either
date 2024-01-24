import { Either } from '../types/either.type';
import { right } from './right';

class TestRight {}

describe('Right', () => {
  const testClass = class TestRight {};
  const testResult = new testClass();
  let result: Either<never, TestRight>;

  beforeEach(() => {
    result = right(testResult);
  });

  it('creates a Right instance', () => {
    const testClass = class TestRight {};
    const testResult = new testClass();
    const result = right(testResult);

    expect(result.value).toEqual(testResult);
    expect(result.value).toBeInstanceOf(testClass);
    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
  });

  it('calls the match method for Right', () => {
    const leftMethod = jest.fn();
    const rightMethod = jest.fn();

    result.match(leftMethod, rightMethod);

    expect(leftMethod).not.toHaveBeenCalled();
    expect(rightMethod).toHaveBeenCalled();
  });

  it('calls the map method for Right', () => {
    const leftMethod = jest.fn();

    const mappedResult: boolean = result.map<boolean>(leftMethod, (value) => {
      return true;
    });

    expect(leftMethod).not.toHaveBeenCalled();
    expect(mappedResult).toEqual(true);
  });
});
