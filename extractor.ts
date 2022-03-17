import { AbstractStrategy } from "./strategy/abstractStrategy";

export class TextExtractor {
  constructor(strategy: AbstractStrategy) {}
}

export function extractorFactory(filePath: string): TextExtractor {
  return new TextExtractor(new AbstractStrategy(filePath));
}
