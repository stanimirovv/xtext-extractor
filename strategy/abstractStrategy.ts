export class AbstractStrategy {
  constructor(filePath: string) {}

  execute(): string {
    throw "Override me.";
  }
}
