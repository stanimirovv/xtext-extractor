import * as util from "util";
import { AbstractStrategy } from "./abstractStrategy";

const exec = util.promisify(require("child_process").exec);

type TextResponse = {
  stdout: string;
  stderr: string;
};
export class PdfStrategy extends AbstractStrategy {
  public async execute(): Promise<string> {
    console.log("filepath:", this.filePath);
    const command = this.buildExtractCommand();
    const response: TextResponse = await exec(command);
    console.log(response);
    return response.stdout;
  }

  private buildExtractCommand() {
    return `pdftotext ${this.filePath} -`;
  }
}
