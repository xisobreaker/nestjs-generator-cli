import path from "path";
import { toKebabCase } from "../../common/case-utils";
import { TableInfo } from "../table-query";
import AbstractGenerator from "./abstract-generator";
import { existsSync, mkdirSync } from "fs";
import { GeneratorConfig } from "../configure";

export default abstract class GeneratorComposite extends AbstractGenerator {
  private generators: AbstractGenerator[] = [];
  private dirName: string;

  constructor(dirName: string) {
    super();

    this.dirName = dirName;
  }

  public generate(tableInfo: TableInfo, configParam: GeneratorConfig, outputDir: string, useSepDir: boolean): void {
    // 检查是否需要使用分离的目录
    if (useSepDir) {
      outputDir = path.join(outputDir, toKebabCase(tableInfo.tableName));
    }
    outputDir = path.join(outputDir, this.dirName);

    // 检查输出目录是否存在
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    // 调用子生成器生成代码
    this.generators.forEach(generator => {
      generator.generate(tableInfo, configParam, outputDir, false)
    });
  }

  /**
   * @brief 添加子生成器
   * 
   * @param generator 子生成器
   */
  public addGenerators(generator: AbstractGenerator): void {
    this.generators.push(generator);
  }
}