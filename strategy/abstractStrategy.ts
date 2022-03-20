import { NeedsImplementationError } from "../common/error.list";

export class AbstractStrategy {
  constructor(protected filePath: string) {}

  async execute(): Promise<string> {
    throw new NeedsImplementationError("Override me.");
  }
}
