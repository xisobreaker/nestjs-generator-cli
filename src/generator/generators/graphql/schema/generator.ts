import path from "path";
import { TableInfo } from "../../../table-query";
import { toCamelCase, toKebabCase, toPascalCase } from "../../../../common/case-utils";
import GeneratorComponent from "../../generator-component";
import { GeneratorConfig } from "../../../configure";

interface GqlSchemaTemplateParams {
  kebabName: string;
  pascalName: string;
  camelName: string;
}

export default class GqlSchemaGenerator extends GeneratorComponent {
  constructor() {
    super('.graphql', path.join(__dirname, 'template.ts.ejs'));
  }

  protected operator(tableInfo: TableInfo, configParam: GeneratorConfig): Record<string, any> {
    const kebabName = toKebabCase(tableInfo.tableName);
    const pascalName = toPascalCase(tableInfo.tableName);
    const camelName = toCamelCase(tableInfo.tableName);

    const templateParams: GqlSchemaTemplateParams = {
      kebabName,
      pascalName,
      camelName,
    };

    return templateParams;
  }
}
