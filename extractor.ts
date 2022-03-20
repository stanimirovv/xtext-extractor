import fs from "fs/promises";
import path from "path";
import { AbstractStrategy } from "./strategy/abstractStrategy";
import { PdfStrategy } from "./strategy/pdfStrategy";

export class TextExtractor {
  private static _supportedFileExtensions: Record<
    string,
    typeof AbstractStrategy
  > = { ".pdf": PdfStrategy };

  constructor(
    private readonly filePath: string,
    private readonly strategy: AbstractStrategy
  ) {}

  public static get supportedFileExtensions() {
    return TextExtractor._supportedFileExtensions;
  }

  public static addExtractor(
    extension: string,
    strategy: typeof AbstractStrategy
  ) {
    TextExtractor._supportedFileExtensions[extension] = strategy;
  }

  private async validateFile() {
    try {
      const fileHandle = await fs.open(this.filePath, "r");
      await fileHandle.stat();
    } catch (err: unknown) {
      throw new Error(`Error stating file: ${this.filePath}`);
    }
  }

  public async extract(): Promise<string> {
    await this.validateFile();
    return this.strategy.execute();
  }
}

export function extractorFactory(filePath: string): TextExtractor {
  const extension = path.extname(filePath);
  const strategyClass = TextExtractor.supportedFileExtensions[extension];
  if (!strategyClass) {
    throw new Error(`Unsupported file type ${extension}`);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new TextExtractor(filePath, new (strategyClass as any)(filePath));
}
