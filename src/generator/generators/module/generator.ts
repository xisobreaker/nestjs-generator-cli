import { TableInfo } from "../../table-query";
import AbstractGenerator from "../abstract-generator";
import { toCamelCase, toKebabCase, toPascalCase } from "../../../common/case-utils";
import path from "path";

interface ModuleTemplateParams {
  moduleName: string;
}

export default class ModuleGenerator extends AbstractGenerator {
  constructor() {
    super('.module.ts', path.join(__dirname, 'template.ts.ejs'));
  }

  protected operator(tableInfo: TableInfo): Record<string, any> {
    const templateParams: ModuleTemplateParams = {
      moduleName: toPascalCase(tableInfo.tableName),
    };
    return templateParams;
  }
}
