import * as childProcess from "child_process";
import * as util from "util";
import { AbstractStrategy } from "./abstractStrategy";

const exec = util.promisify(childProcess.exec);

type TextResponse = {
  stdout: string;
  stderr: string;
};
export class PdfStrategy extends AbstractStrategy {
  public async execute(): Promise<string> {
    const command = this.buildExtractCommand();
    const response: TextResponse = await exec(command);
    return response.stdout;
  }

  private buildExtractCommand() {
    return `pdftotext ${this.filePath} -`;
  }
}
