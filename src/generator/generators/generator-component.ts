import path from "path";
import { toKebabCase } from "../../common/case-utils";
import { EJSTemplateEngine } from "../../common/ejs-template";
import { TableInfo } from "../table-query";
import AbstractGenerator from "./abstract-generator";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "fs";
import { GeneratorConfig } from "../configure";

export default abstract class GeneratorComponent extends AbstractGenerator {
  private ejsEngine: EJSTemplateEngine;
  private suffixName;

  /**
   * @brief 构造函数
   * 
   * @param suffixName 代码文件后缀名
   */
  constructor(suffixName: string, templatePath: string) {
    super();

    this.suffixName = suffixName;
    this.ejsEngine = new EJSTemplateEngine(templatePath);
  }

  /**
   * @brief 生成代码文件
   * 
   * @param tableInfo 数据库表信息
   * @param outputDir 输出目录
   */
  public generate(tableInfo: TableInfo, configParam: GeneratorConfig, outputDir: string, isolatedDir: boolean) {
    // 检查是否需要使用分离的目录
    if (isolatedDir) {
      outputDir = path.join(outputDir, toKebabCase(tableInfo.tableName));
    }

    // 检查输出目录是否存在
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    // 调用具体的生成代码逻辑
    const filename = `${toKebabCase(tableInfo.tableName)}${this.suffixName}`;
    const templateParams = this.operator(tableInfo, configParam);

    // 生成代码文件
    const renderedContent = this.ejsEngine.render(templateParams);
    const fullPathname = path.join(outputDir, filename);
    writeFileSync(fullPathname, renderedContent);
  }

  /**
   * @brief 添加子生成器
   * 
   * @param generator 子生成器
   */
  public addGenerators(generator: AbstractGenerator): void {
  }

  /**
   * @brief 具体的生成代码逻辑
   * 
   * @param tableInfo 数据库表信息
   * @param outputDir 输出目录
   * @param filename 文件名
   */
  protected abstract operator(tableInfo: TableInfo, configParam: GeneratorConfig): Record<string, any>;
}