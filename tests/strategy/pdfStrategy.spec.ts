import childProcess from "child_process";
import { ExtractionError, SystemError } from "../../common/error.list";
import { PdfStrategy } from "../../strategy/pdfStrategy";
jest.mock("child_process");

describe("pdfStrategy", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("test pdf extraction throw expected", async () => {
    const strategy = new PdfStrategy("./tests/data/hi.pdf");
    const spy = jest.spyOn(childProcess, "exec");
    spy.mockImplementationOnce(() => {
      throw new Error("failed extraction");
    });

    expect.assertions(3);
    try {
      await strategy.execute();
    } catch (err: unknown) {
      expect(err instanceof ExtractionError).toBeTruthy();
      expect((err as any).toString()).toEqual(
        "Error: Error: failed extraction"
      );
    }
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it("test pdf extraction throw unexpected", async () => {
    const strategy = new PdfStrategy("./tests/data/hi.pdf");
    const spy = jest.spyOn(childProcess, "exec");
    spy.mockImplementationOnce(() => {
      // This opens a  soner cloud issue, but is needed for testing
      throw "unexpected error";
    });

    expect.assertions(3);
    try {
      await strategy.execute();
    } catch (err: unknown) {
      expect(err instanceof SystemError).toBeTruthy();
      expect((err as any).toString()).toEqual(
        "Error: Unexpected error running: pdftotext ./tests/data/hi.pdf -"
      );
    }
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
