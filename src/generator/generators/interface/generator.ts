import { TableInfo } from "../../table-query";
import AbstractGenerator from "../abstract-generator";
import { toPascalCase } from "../../../common/case-utils";
import path from "path";

interface InterfaceTemplateParams {
  tableName: string;
  tableComment: string;
  interfaceName: string;
}

export default class InterfaceGenerator extends AbstractGenerator {
  constructor() {
    super('.interface.ts', path.join(__dirname, 'template.ts.ejs'));
  }

  protected operator(tableInfo: TableInfo): Record<string, any> {
    const templateParams: InterfaceTemplateParams = {
      tableName: tableInfo.tableName,
      tableComment: tableInfo.tableComment,
      interfaceName: toPascalCase(tableInfo.tableName),
    };
    return templateParams;
  }
}
