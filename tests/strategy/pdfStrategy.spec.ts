import { PdfStrategy } from "../../strategy/pdfStrategy";

describe("pdfStrategy", () => {
  it("test pdf extraction", async () => {
    const strategy = new PdfStrategy("./tests/data/hi.pdf");
    expect(await strategy.execute()).toEqual("Hello world\n\n\f");
  });
});
