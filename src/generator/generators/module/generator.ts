import path from "path";
import { TableInfo } from "../../table-query";
import { toPascalCase } from "../../../common/case-utils";
import GeneratorComponent from "../generator-component";

interface ModuleTemplateParams {
  moduleName: string;
}

export default class ModuleGenerator extends GeneratorComponent {
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
