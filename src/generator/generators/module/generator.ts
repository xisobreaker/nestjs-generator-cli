import path from "path";
import { TableInfo } from "../../table-query";
import { toCamelCase, toKebabCase, toPascalCase } from "../../../common/case-utils";
import GeneratorComponent from "../generator-component";
import { GeneratorConfig } from "../../configure";

interface ModuleTemplateParams {
  kebabName: string;
  pascalName: string;
  camelName: string;
}

export default class ModuleGenerator extends GeneratorComponent {
  constructor() {
    super('.module.ts', path.join(__dirname, 'template.ts.ejs'));
  }

  protected operator(tableInfo: TableInfo, configParam: GeneratorConfig): Record<string, any> {
    const kebabName = toKebabCase(tableInfo.tableName);
    const pascalName = toPascalCase(tableInfo.tableName);
    const camelName = toCamelCase(tableInfo.tableName);

    const templateParams: ModuleTemplateParams = {
      kebabName,
      pascalName,
      camelName,
    };
    return templateParams;
  }
}
