import { extractorFactory, TextExtractor } from "../extractor";
import { AbstractStrategy } from "../strategy/abstractStrategy";

describe("Extractor", () => {
  it("factory returns an extractor", () => {
    const extractor = extractorFactory("myfile.pdf");
    expect(extractor instanceof TextExtractor).toBeTruthy();
  });

  it("extractor can extract text", async () => {
    const extractor = extractorFactory("./tests/data/hi.pdf");
    expect(await extractor.extract()).toEqual("hello");
  });

  it("extractor can extract text", async () => {
    try {
      extractorFactory("myfile.unsuported");
    } catch (err) {
      expect(err).toEqual("Unsupported file type .unsuported");
    }
  });

  it("extractor unsupported format", () => {
    expect.assertions(1);
    try {
      extractorFactory("myfile.unsuported");
    } catch (err) {
      expect(err).toEqual("Unsupported file type .unsuported");
    }
  });

  it("add custom extractor, use it", async () => {
    class TestStrategy extends AbstractStrategy {
      public execute(): string {
        return "test";
      }
    }
    TextExtractor.addExtractor(".ext", TestStrategy);
    expect(Object.keys(TextExtractor.supportedFileExtensions).length).toEqual(
      2
    );
    const extractor = extractorFactory("./tests/data/myfile.ext");
    expect(await extractor.extract()).toEqual("test");
  });
});
