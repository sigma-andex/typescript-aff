import {
  bind,
  bindFlipped,
  delay,
  fromAff,
  launchAff_,
  pure,
  toAffE,
  unsafeFromAff,
} from "../src/index.js";
import { pipe } from "fp-ts/lib/function.js";

describe("testing aff", () => {
  test("convert promise <=> aff", async () => {
    const promiseE = async () => {
      console.log("Hello world!");
      return 5;
    };

    const aff = toAffE(promiseE);
    const result = await unsafeFromAff(aff);

    expect(result).toBe(5);
  });
  test("support pure", async () => {
    const value = 5;
    const aff = pure(value);
    const result = await unsafeFromAff(aff);

    expect(result).toBe(value);
  });

  test("support bind", async () => {
    const aff = bind(pure(5), (n: number) =>
      bind(pure(10), (m: number) => pure(n + m + 100))
    );
    const result = await unsafeFromAff(aff);
    expect(result).toBe(115);
  });
  test("support delay", async () => {
    const aff = bind(delay(3000), (x) => pure("delay"));
    const result = await unsafeFromAff(aff);

    expect(result).toBe("delay");
  }, 5000);
});
