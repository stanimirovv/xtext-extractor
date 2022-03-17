import { extractorFactory, TextExtractor } from "../extractor";
import { AbstractStrategy } from "../strategy/abstractStrategy";

describe("Extractor", () => {
  it("factory returns an extractor", () => {
    const extractor = extractorFactory("myfile.pdf");
    expect(extractor instanceof TextExtractor).toBeTruthy();
  });

  it("extractor can extract text", () => {
    const extractor = extractorFactory("myfile.pdf");
    expect(extractor.extract()).toEqual("hello");
  });

  it("extractor can extract text", () => {
    expect.assertions(1);
    try {
      extractorFactory("myfile");
    } catch (err) {
      expect(err).toEqual("Unsupported file type");
    }
  });

  it("add custom extractor, use it", () => {
    class TestStrategy extends AbstractStrategy {
      public execute(): string {
        return "test";
      }
    }
    TextExtractor.addExtractor(".ext", TestStrategy);
    expect(Object.keys(TextExtractor.supportedFileExtensions).length).toEqual(
      2
    );
    console.log(TextExtractor.supportedFileExtensions);
    const extractor = extractorFactory("myfile.ext");
    expect(extractor.extract()).toEqual("test");
  });
});
