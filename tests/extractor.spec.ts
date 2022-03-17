import { extractorFactory, TextExtractor } from "../extractor";

describe("Extractor", () => {
  it("factory returns an extractor", () => {
    const extractor = extractorFactory("myfile");
    expect(extractor instanceof TextExtractor).toBeTruthy();
  });
});
