import path from "path";
import { TableInfo } from "../../table-query";
import { toCamelCase, toKebabCase, toPascalCase } from "../../../common/case-utils";
import GeneratorComponent from "../generator-component";

interface ControllerTemplateParams {
  routePath: string;
  controllerName: string;
  serviceName: string;
}

export default class ControllerGenerator extends GeneratorComponent {
  constructor() {
    super('.controller.ts', path.join(__dirname, 'template.ts.ejs'));
  }

  protected operator(tableInfo: TableInfo): Record<string, any> {
    const templateParams: ControllerTemplateParams = {
      routePath: `${toKebabCase(tableInfo.tableName)}`,
      controllerName: toPascalCase(tableInfo.tableName),
      serviceName: toCamelCase(tableInfo.tableName),
    };

    return templateParams;
  }
}
