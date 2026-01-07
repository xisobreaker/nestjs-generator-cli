import path from "path";
import { TableInfo } from "../../table-query";
import { toCamelCase, toKebabCase, toPascalCase } from "../../../common/case-utils";
import GeneratorComponent from "../generator-component";
import { GeneratorConfig } from "../../configure";

interface ControllerTemplateParams {
  kebabName: string;
  pascalName: string;
  camelName: string;
  importModules: string;
}

export default class ControllerGenerator extends GeneratorComponent {
  constructor() {
    super('.controller.ts', path.join(__dirname, 'template.ts.ejs'));
  }

  protected operator(tableInfo: TableInfo, configParam: GeneratorConfig): Record<string, any> {
    const kebabName = toKebabCase(tableInfo.tableName);
    const pascalName = toPascalCase(tableInfo.tableName);
    const camelName = toCamelCase(tableInfo.tableName);

    // 导入模块
    const importModules = [];
    importModules.push(`import { ${pascalName}Service } from \'./${kebabName}.service\';`);

    const templateParams: ControllerTemplateParams = {
      kebabName,
      pascalName,
      camelName,
      importModules: importModules.join('\n'),
    };
    return templateParams;
  }
}
