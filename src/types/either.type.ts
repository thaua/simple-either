import { Left } from '../classes/left';
import { Right } from '../classes/right';

export type Either<L, R> = Left<L> | Right<R>;
