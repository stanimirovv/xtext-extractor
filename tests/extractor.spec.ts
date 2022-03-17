import { TextExtractor } from "../extractor";
import { AbstractStrategy } from "../strategy/abstractStrategy";

describe("Extractor", () => {
  it("constructor returns an object", () => {
    const abstractStrategy = new AbstractStrategy();
    const extractor = new TextExtractor(abstractStrategy);
    expect(extractor).toBeDefined();
  });
});
