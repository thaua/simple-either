import { Right } from './right';

export class Left<L> {
  constructor(public readonly value: L) {}

  isLeft(): this is Left<L> {
    return true;
  }

  isRight(): this is Right<never> {
    return false;
  }
}

export const left = <L>(value: L): Left<L> => {
  return new Left(value);
};
