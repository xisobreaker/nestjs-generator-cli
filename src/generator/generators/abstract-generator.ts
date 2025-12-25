import { existsSync, mkdirSync } from "fs";
import { TableInfo } from "../table-query";

/**
 * @brief 代码生成器基类
 */
export default abstract class AbstractGenerator {
  /**
   * @brief 生成代码文件
   * 
   * @param tableInfo 数据库表信息
   * @param outputDir 输出目录
   */
  public generate(tableInfo: TableInfo, outputDir: string) {
    // 检查输出目录是否存在
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    // 调用具体的生成代码逻辑
    this.operator(tableInfo, outputDir);
  }

  /**
   * @brief 具体的生成代码逻辑
   * 
   * @param tableInfo 数据库表信息
   * @param outputDir 输出目录
   */
  protected abstract operator(tableInfo: TableInfo, outputDir: string): void;
}