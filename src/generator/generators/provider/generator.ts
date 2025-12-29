import path from "path";
import { TableInfo } from "../../table-query";
import { toCamelCase, toPascalCase } from "../../../common/case-utils";
import GeneratorComponent from "../generator-component";


interface ProviderTemplateParams {
  tableName: string;
  modelName: string;
  providerName: string;
}

export default class ProviderGenerator extends GeneratorComponent {
  constructor() {
    super('.provider.ts', path.join(__dirname, 'template.ts.ejs'));
  }

  protected operator(tableInfo: TableInfo): Record<string, any> {
    const templateParams: ProviderTemplateParams = {
      tableName: tableInfo.tableName,
      modelName: toPascalCase(tableInfo.tableName),
      providerName: `${toCamelCase(tableInfo.tableName)}`,
    };
    return templateParams;
  }
}
