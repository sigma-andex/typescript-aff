import {
  bind,
  bindFlipped,
  fromAff,
  launchAff_,
  pure,
  toAffE,
} from "../src/index.js";
import { pipe } from "fp-ts/lib/function.js";

describe("testing aff", () => {
  test("convert promise to aff and aff to promise", async () => {
    const promiseE = async () => {
      console.log("Hello world!");
      return 5;
    };

    const aff = toAffE(promiseE);
    const result = await fromAff(aff)();

    expect(result).toBe(5);
  });
  test("support pure", async () => {
    const value = 5;
    const aff = pure(value);
    const result = await fromAff(aff)();

    expect(result).toBe(value);
  });

  test("support bind", async () => {
    const aff = pipe(
      pure(5),
      bindFlipped((n: number) => pure(n + 10)),
      bindFlipped((n: number) => pure(n + 100))
    );
    const result = await fromAff(aff)();
    expect(result).toBe(115);
  });
});
