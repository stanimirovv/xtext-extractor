import childProcess from "child_process";
import util from "util";
import { ExtractionError, SystemError } from "../common/error.list";
import { AbstractStrategy } from "./abstractStrategy";

const exec = util.promisify(childProcess.exec);

type TextResponse = {
  stdout: string;
  stderr: string;
};
export class PdfStrategy extends AbstractStrategy {
  public async execute(): Promise<string> {
    try {
      const command = this.buildExtractCommand();
      // TODO should the request fail if there is response on std err ?
      const response: TextResponse = await exec(command);
      return response.stdout;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new ExtractionError(error.toString());
      } else {
        throw new SystemError(
          `Unexpected error running: pdftotext ${this.filePath} -`
        );
      }
    }
  }

  private buildExtractCommand() {
    return `pdftotext ${this.filePath} -`;
  }
}
