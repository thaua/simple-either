import { IEither } from '../interfaces/either.interface';
import { Left } from './left';

export class Right<R> implements IEither<R> {
  constructor(public readonly value: R) {}

  isLeft(): this is Left<never> {
    return false;
  }

  isRight(): this is Right<R> {
    return true;
  }

  map<T>(leftCallback: (value: never) => T, rightCallback: (value: R) => T): T {
    return rightCallback(this.value);
  }

  match(leftCallback: (value: never) => void, rightCallback: (value: R) => void): void {
    return rightCallback(this.value);
  }
}

export const right = <R>(value: R): Right<R> => {
  return new Right(value);
};
