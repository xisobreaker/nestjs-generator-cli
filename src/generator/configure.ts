import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";

const DEFAULT_CONFIG_FILE = ".generator-cli.json";

/**
 * @brief 模板配置项
 */
interface TemplateConfig {
  outputDir: string;
  isolatedDir: boolean;
}

/**
 * @brief 生成器配置项
 */
export interface GeneratorConfig {
  controller: TemplateConfig;
  dto: TemplateConfig;
  interface: TemplateConfig;
  model: TemplateConfig;
  module: TemplateConfig;
  service: TemplateConfig;
}

/**
 * @brief 获取默认生成器配置项
 * 
 * @returns 默认生成器配置项
 */
export const getDefaultConfig = (): GeneratorConfig => {
  return {
    controller: {
      outputDir: 'app/src/modules',
      isolatedDir: true,
    },
    dto: {
      outputDir: 'app/src/modules',
      isolatedDir: true,
    },
    interface: {
      outputDir: 'app/src/modules',
      isolatedDir: true,
    },
    model: {
      outputDir: 'app/src/models',
      isolatedDir: false,
    },
    module: {
      outputDir: 'app/src/modules',
      isolatedDir: true,
    },
    service: {
      outputDir: 'app/src/modules',
      isolatedDir: true,
    },
  };
}

/**
 * @brief 初始化生成器配置项
 * 
 * @param path 项目路径
 */
export const initGeneratorConfig = (filepath: string) => {
  const configFile = path.join(filepath, DEFAULT_CONFIG_FILE);
  const configParam: GeneratorConfig = getDefaultConfig();
  writeFileSync(configFile, JSON.stringify(configParam, null, 2));
};

/**
 * @brief 加载生成器配置项
 * 
 * @param path 项目路径
 * @returns 生成器配置项
 */
export const loadGeneratorConfig = (filepath: string): GeneratorConfig => {
  const configFile = path.join(filepath, DEFAULT_CONFIG_FILE);
  if (!existsSync(configFile)) {
    return getDefaultConfig();
  }

  return JSON.parse(readFileSync(configFile, 'utf-8'));
}