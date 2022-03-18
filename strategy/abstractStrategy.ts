export class AbstractStrategy {
  constructor(protected filePath: string) {}

  async execute(): Promise<string> {
    throw "Override me.";
  }
}
