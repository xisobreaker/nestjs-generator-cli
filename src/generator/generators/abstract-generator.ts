import { existsSync, mkdirSync, writeFileSync } from "fs";
import { TableInfo } from "../table-query";
import { toKebabCase } from "../../common/case-utils";
import path from "path";
import { EJSTemplateEngine } from "../../common/ejs-template";

/**
 * @brief 代码生成器基类
 */
export default abstract class AbstractGenerator {
  private ejsEngine: EJSTemplateEngine;
  private suffixName;

  /**
   * @brief 构造函数
   * 
   * @param suffixName 代码文件后缀名
   */
  constructor(suffixName: string, templatePath: string) {
    this.suffixName = suffixName;
    this.ejsEngine = new EJSTemplateEngine(templatePath);
  }

  /**
   * @brief 生成代码文件
   * 
   * @param tableInfo 数据库表信息
   * @param outputDir 输出目录
   */
  public generate(tableInfo: TableInfo, outputDir: string, useSepDir: boolean) {
    // 检查是否需要使用分离的目录
    if (useSepDir) {
      outputDir = path.join(outputDir, toKebabCase(tableInfo.tableName));
    }

    // 检查输出目录是否存在
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    // 调用具体的生成代码逻辑
    const filename = `${toKebabCase(tableInfo.tableName)}${this.suffixName}`;
    const templateParams = this.operator(tableInfo);

    // 生成代码文件
    const renderedContent = this.ejsEngine.render(templateParams);
    writeFileSync(path.join(outputDir, filename), renderedContent);
  }

  /**
   * @brief 具体的生成代码逻辑
   * 
   * @param tableInfo 数据库表信息
   * @param outputDir 输出目录
   * @param filename 文件名
   */
  protected abstract operator(tableInfo: TableInfo): Record<string, any>;
}