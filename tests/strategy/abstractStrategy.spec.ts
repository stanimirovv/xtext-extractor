import { AbstractStrategy } from "../../strategy/abstractStrategy";

describe("AbstractSrategy", () => {
  it("constructor returns an object", () => {
    const abstractStrategy = new AbstractStrategy();
    expect(abstractStrategy).toBeDefined();
  });
});
