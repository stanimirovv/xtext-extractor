import { NeedsImplementationError } from "../../common/error.list";
import { AbstractStrategy } from "../../strategy/abstractStrategy";

describe("AbstractSrategy", () => {
  it("constructor returns an object", () => {
    const abstractStrategy = new AbstractStrategy("test");
    expect(abstractStrategy).toBeDefined();
  });

  it("request implementation", async () => {
    const abstractStrategy = new AbstractStrategy("test");
    expect.assertions(2);
    expect(abstractStrategy).toBeDefined();
    try {
      await abstractStrategy.execute();
    } catch (err: unknown) {
      if (err instanceof NeedsImplementationError) {
        expect(err.toString()).toEqual("Error: Override me.");
      }
    }
  });
});
