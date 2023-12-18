import { Left } from './left';

export class Right<R> {
  constructor(public readonly value: R) {}

  isLeft(): this is Left<never> {
    return false;
  }

  isRight(): this is Right<R> {
    return true;
  }
}

export const right = <R>(value: R): Right<R> => {
  return new Right(value);
};
