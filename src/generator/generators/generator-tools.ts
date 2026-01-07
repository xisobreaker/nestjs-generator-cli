import AbstractGenerator from "./abstract-generator";
import ControllerGenerator from "./controller/generator";
import DtoGenerator from "./dto/generator";
import InterfaceGenerator from "./interface/generator";
import ModelGenerator from "./model/generator";
import ModuleGenerator from "./module/generator";
import ProviderGenerator from "./provider/generator";
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

export const getCodeGenerators = (): GeneratorInfo[] => {
  const codeGenerators: GeneratorInfo[] = [
    {
      name: 'controller',
      generator: new ControllerGenerator(),
      outputDir: 'app/src',
      isolatedDir: true,
    },
    {
      name: 'dto',
      generator: new DtoGenerator(),
      outputDir: 'app/src',
      isolatedDir: true,
    },
    {
      name: 'interface',
      generator: new InterfaceGenerator(),
      outputDir: 'app/src',
      isolatedDir: true,
    },
    {
      name: 'model',
      generator: new ModelGenerator(),
      outputDir: 'app/src',
      isolatedDir: true,
    },
    {
      name: 'module',
      generator: new ModuleGenerator(),
      outputDir: 'app/src',
      isolatedDir: true,
    },
    {
      name: 'provider',
      generator: new ProviderGenerator(),
      outputDir: 'app/src',
      isolatedDir: true,
    },
    {
      name: 'service',
      generator: new ServiceGenerator(),
      outputDir: 'app/src',
      isolatedDir: true,
    },
  ];

  return codeGenerators;
}