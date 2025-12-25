import AbstractGenerator from "./abstract-generator";
import InterfaceGenerator from "./interface/generator";
import ModelGenerator from "./model/generator";
import ServiceGenerator from "./service/generator";

/**
 * @brief 代码生成器信息
 */
export interface GeneratorInfo {
  name: string;
  generator: AbstractGenerator;
  outdir: string;
};



export const getCodeGenerators = (): GeneratorInfo[] => {
  const codeGenerators: GeneratorInfo[] = [
    {
      name: 'model',
      generator: new ModelGenerator(),
      outdir: 'app/src/models',
    },
    {
      name: 'interface',
      generator: new InterfaceGenerator(),
      outdir: 'app/src/interfaces',
    },
    {
      name: 'service',
      generator: new ServiceGenerator(),
      outdir: 'app/src/services',
    },
  ];

  return codeGenerators;
}