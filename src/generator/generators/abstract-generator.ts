import { GeneratorConfig } from "../configure";
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
  public abstract generate(tableInfo: TableInfo, configParam: GeneratorConfig, outputDir: string, isolatedDir: boolean): void;

  /**
   * @brief 添加子生成器
   * 
   * @param generator 子生成器
   */
  public abstract addGenerators(generator: AbstractGenerator): void;
}