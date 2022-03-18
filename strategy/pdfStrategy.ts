import { AbstractStrategy } from "./abstractStrategy";

export class PdfStrategy extends AbstractStrategy {
  public execute(): string {
    return "hello";
  }
}
