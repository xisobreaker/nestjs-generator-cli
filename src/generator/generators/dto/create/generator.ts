import path from "path";
import GeneratorComponent from "../../generator-component";
import { TableInfo } from "../../../table-query";
import { toCamelCase, toKebabCase, toPascalCase } from "../../../../common/case-utils";
import { GeneratorConfig } from "../../../configure";

interface CreateDtoTemplateParams {
  kebabName: string;
  pascalName: string;
  camelName: string;
}

export default class CreateDtoGenerator extends GeneratorComponent {
  constructor() {
    super('.create.ts', path.join(__dirname, 'template.ts.ejs'));
  }

  protected operator(tableInfo: TableInfo, configParam: GeneratorConfig): Record<string, any> {
    const kebabName = toKebabCase(tableInfo.tableName);
    const pascalName = toPascalCase(tableInfo.tableName);
    const camelName = toCamelCase(tableInfo.tableName);

    const templateParams: CreateDtoTemplateParams = {
      kebabName,
      pascalName,
      camelName,
    };

    return templateParams;
  }
}
