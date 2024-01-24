import { IEither } from '../interfaces/either.interface';
import { Right } from './right';

export class Left<L> implements IEither<L> {
  constructor(public readonly value: L) {}

  isLeft(): this is Left<L> {
    return true;
  }

  isRight(): this is Right<never> {
    return false;
  }

  map<T>(leftCallback: (value: L) => T, rightCallback: (value: never) => T): T {
    return leftCallback(this.value);
  }

  match(leftCallback: (value: L) => void, rightCallback: (value: never) => void): void {
    return leftCallback(this.value);
  }
}

export const left = <L>(value: L): Left<L> => {
  return new Left(value);
};
