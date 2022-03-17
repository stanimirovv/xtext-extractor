import path from "path";
import { AbstractStrategy } from "./strategy/abstractStrategy";
import { PdfStrategy } from "./strategy/pdfStrategy";

interface IStrategy {
  execute(): string;
}

export class TextExtractor {
  private static _supportedFileExtensions: Record<
    string,
    typeof AbstractStrategy
  > = { ".pdf": PdfStrategy };

  constructor(private readonly strategy: AbstractStrategy) {}

  public static get supportedFileExtensions() {
    return TextExtractor._supportedFileExtensions;
  }

  public static addExtractor(
    extension: string,
    strategy: typeof AbstractStrategy
  ) {
    TextExtractor._supportedFileExtensions[extension] = strategy;
  }

  public extract(): string {
    return this.strategy.execute();
  }
}

export function extractorFactory(filePath: string): TextExtractor {
  const extension = path.extname(filePath);
  const strategyClass = TextExtractor.supportedFileExtensions[extension];
  if (!strategyClass) {
    throw `Unsupported file type ${extension}`;
  }
  return new TextExtractor(new (strategyClass as any)(filePath));
}
