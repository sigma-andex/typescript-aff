import * as PA from "../purescript-js-promise-aff/output/Promise.Aff/index.js";
import * as A from "../purescript-js-promise-aff/output/Effect.Aff/index.js";

export type Aff<T> = unknown;
export type Fiber<T> = unknown;
export type Effect<T> = () => T;

export function toAffE<T>(promise: () => Promise<T>): Aff<T> {
  return PA.toAffE(promise);
}

export function fromAff<T>(aff: Aff<T>): Effect<Promise<T>> {
  return PA.fromAff()(aff);
}

export function launchAff_<T>(aff: Aff<T>): Effect<T> {
  return A.launchAff_(aff);
}

export function launchAff<T>(aff: Aff<T>): Effect<Fiber<T>> {
  return A.launchAff(aff);
}

export function pure<T>(value: T): Aff<T> {
  return A.applicativeAff.pure(value);
}

export function bind<T>(aff: Aff<T>): (f: (t: T) => Aff<T>) => Aff<T> {
  return (f) => A.bindAff.bind(aff)(f);
}

export function bindFlipped<T>(f: (t: T) => Aff<T>): (aff: Aff<T>) => Aff<T> {
  return (aff) => A.bindAff.bind(aff)(f);
}
