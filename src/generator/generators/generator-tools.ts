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
  outdir: string;     // 输出目录
  useSepDir: boolean; // 使用分离的目录
};

export const getCodeGenerators = (): GeneratorInfo[] => {
  const codeGenerators: GeneratorInfo[] = [
    {
      name: 'controller',
      generator: new ControllerGenerator(),
      outdir: 'app/src',
      useSepDir: true,
    },
    {
      name: 'dto',
      generator: new DtoGenerator(),
      outdir: 'app/src',
      useSepDir: true,
    },
    {
      name: 'interface',
      generator: new InterfaceGenerator(),
      outdir: 'app/src',
      useSepDir: true,
    },
    {
      name: 'model',
      generator: new ModelGenerator(),
      outdir: 'app/src',
      useSepDir: true,
    },
    {
      name: 'module',
      generator: new ModuleGenerator(),
      outdir: 'app/src',
      useSepDir: true,
    },
    {
      name: 'provider',
      generator: new ProviderGenerator(),
      outdir: 'app/src',
      useSepDir: true,
    },
    {
      name: 'service',
      generator: new ServiceGenerator(),
      outdir: 'app/src',
      useSepDir: true,
    },
  ];

  return codeGenerators;
}