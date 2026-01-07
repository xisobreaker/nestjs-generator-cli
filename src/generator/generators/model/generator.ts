import path from "path";
import { toCamelCase, toKebabCase, toPascalCase } from "../../../common/case-utils";
import { TableInfo } from "../../table-query";
import GeneratorComponent from "../generator-component";
import { GeneratorConfig } from "../../configure";

interface ModelTemplateParams {
  kebabName: string;
  pascalName: string;
  camelName: string;
  tableName: string;
  tableComment: string;
}

export default class ModelGenerator extends GeneratorComponent {
  constructor() {
    super('.model.ts', path.join(__dirname, 'template.ts.ejs'));
  }

  protected operator(tableInfo: TableInfo, configParam: GeneratorConfig): Record<string, any> {
    const kebabName = toKebabCase(tableInfo.tableName);
    const pascalName = toPascalCase(tableInfo.tableName);
    const camelName = toCamelCase(tableInfo.tableName);

    const templateParams: ModelTemplateParams = {
      kebabName,
      pascalName,
      camelName,
      tableName: tableInfo.tableName,
      tableComment: tableInfo.tableComment,
    };
    return templateParams;
  }
}
