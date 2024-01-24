export interface IEither<S> {
  isLeft(): boolean;

  isRight(): boolean;

  map(leftCallback: (value: S) => S, rightCallback: (value: S) => S): S;

  match(leftCallback: (value: S) => void, rightCallback: (value: S) => void): void;
}
