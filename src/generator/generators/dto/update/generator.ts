import path from "path";
import { TableInfo } from "../../../table-query";
import { toCamelCase, toKebabCase, toPascalCase } from "../../../../common/case-utils";
import GeneratorComponent from "../../generator-component";
import { GeneratorConfig } from "../../../configure";

interface UpdateDtoTemplateParams {
  dtoName: string;
}

export default class UpdateDtoGenerator extends GeneratorComponent {
  constructor() {
    super('.update.ts', path.join(__dirname, 'template.ts.ejs'));
  }

  protected operator(tableInfo: TableInfo, configParam: GeneratorConfig): Record<string, any> {
    const templateParams: UpdateDtoTemplateParams = {
      dtoName: toPascalCase(tableInfo.tableName),
    };

    return templateParams;
  }
}
