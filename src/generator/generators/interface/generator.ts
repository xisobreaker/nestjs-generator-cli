import path from "path";
import { TableInfo } from "../../table-query";
import { toPascalCase } from "../../../common/case-utils";
import GeneratorComponent from "../generator-component";
import { GeneratorConfig } from "../../configure";

interface InterfaceTemplateParams {
  tableName: string;
  tableComment: string;
  interfaceName: string;
}

export default class InterfaceGenerator extends GeneratorComponent {
  constructor() {
    super('.interface.ts', path.join(__dirname, 'template.ts.ejs'));
  }

  protected operator(tableInfo: TableInfo, configParam: GeneratorConfig): Record<string, any> {
    const templateParams: InterfaceTemplateParams = {
      tableName: tableInfo.tableName,
      tableComment: tableInfo.tableComment,
      interfaceName: toPascalCase(tableInfo.tableName),
    };
    return templateParams;
  }
}
