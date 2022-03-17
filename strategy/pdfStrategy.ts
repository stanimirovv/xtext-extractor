import { AbstractStrategy } from "./abstractStrategy";

export class PdfStrategy extends AbstractStrategy implements IStrategy {
  public execute(): string {
    return "hello";
  }
}
