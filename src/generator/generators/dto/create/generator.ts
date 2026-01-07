import path from "path";
import GeneratorComponent from "../../generator-component";
import { TableInfo } from "../../../table-query";
import { toCamelCase, toKebabCase, toPascalCase } from "../../../../common/case-utils";
import { GeneratorConfig } from "../../../configure";

interface CreateDtoTemplateParams {
  dtoName: string;
}

export default class CreateDtoGenerator extends GeneratorComponent {
  constructor() {
    super('.create.ts', path.join(__dirname, 'template.ts.ejs'));
  }

  protected operator(tableInfo: TableInfo, configParam: GeneratorConfig): Record<string, any> {
    const templateParams: CreateDtoTemplateParams = {
      dtoName: toPascalCase(tableInfo.tableName),
    };

    return templateParams;
  }
}
