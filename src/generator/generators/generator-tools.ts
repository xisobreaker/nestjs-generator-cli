import { GeneratorConfig } from "../configure";
import AbstractGenerator from "./abstract-generator";
import ControllerGenerator from "./controller/generator";
import DtoGenerator from "./dto/generator";
import InterfaceGenerator from "./interface/generator";
import ModelGenerator from "./model/generator";
import ModuleGenerator from "./module/generator";
import ServiceGenerator from "./service/generator";

/**
 * @brief 代码生成器信息
 */
export interface GeneratorInfo {
  name: string;
  generator: AbstractGenerator;
  outputDir: string;     // 输出目录
  isolatedDir: boolean; // 使用分离的目录
};

export const getCodeGenerators = (options: GeneratorConfig): GeneratorInfo[] => {
  const codeGenerators: GeneratorInfo[] = [
    {
      name: 'controller',
      generator: new ControllerGenerator(),
      outputDir: options.controller.outputDir,
      isolatedDir: options.controller.isolatedDir,
    },
    {
      name: 'dto',
      generator: new DtoGenerator(),
      outputDir: options.dto.outputDir,
      isolatedDir: options.dto.isolatedDir,
    },
    {
      name: 'interface',
      generator: new InterfaceGenerator(),
      outputDir: options.interface.outputDir,
      isolatedDir: options.interface.isolatedDir,
    },
    {
      name: 'model',
      generator: new ModelGenerator(),
      outputDir: options.model.outputDir,
      isolatedDir: options.model.isolatedDir,
    },
    {
      name: 'module',
      generator: new ModuleGenerator(),
      outputDir: options.module.outputDir,
      isolatedDir: options.module.isolatedDir,
    },
    {
      name: 'service',
      generator: new ServiceGenerator(),
      outputDir: options.service.outputDir,
      isolatedDir: options.service.isolatedDir,
    },
  ];

  return codeGenerators;
}