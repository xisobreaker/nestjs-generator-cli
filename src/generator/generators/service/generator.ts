import path from "path";
import { TableInfo } from "../../table-query";
import { toCamelCase, toKebabCase, toPascalCase } from "../../../common/case-utils";
import GeneratorComponent from "../generator-component";
import { GeneratorConfig } from "../../configure";

interface ServiceTemplateParams {
  kebabName: string;
  pascalName: string;
  camelName: string;
  tableName: string;
  importModules: string;
}

export default class ServiceGenerator extends GeneratorComponent {

  constructor() {
    super('.service.ts', path.join(__dirname, 'template.ts.ejs'));
  }
  protected operator(tableInfo: TableInfo, configParam: GeneratorConfig): Record<string, any> {
    const kebabName = toKebabCase(tableInfo.tableName);
    const pascalName = toPascalCase(tableInfo.tableName);
    const camelName = toCamelCase(tableInfo.tableName);

    // 导入模块
    const importModules = [];
    importModules.push(`import { ${pascalName}Model } from \'./${kebabName}.model\';`);

    const templateParams: ServiceTemplateParams = {
      kebabName,
      pascalName,
      camelName,
      tableName: tableInfo.tableName,
      importModules: importModules.join('\n'),
    };
    return templateParams;
  }
}
