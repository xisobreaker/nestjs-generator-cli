import path from "path";
import { TableInfo } from "../../table-query";
import { toPascalCase } from "../../../common/case-utils";
import GeneratorComponent from "../generator-component";
import { GeneratorConfig } from "../../configure";

interface ServiceTemplateParams {
  tableName: string;
  tableComment: string;
  serviceName: string;
}

export default class ServiceGenerator extends GeneratorComponent {

  constructor() {
    super('.service.ts', path.join(__dirname, 'template.ts.ejs'));
  }
  protected operator(tableInfo: TableInfo, configParam: GeneratorConfig): Record<string, any> {
    const templateParams: ServiceTemplateParams = {
      tableName: tableInfo.tableName,
      tableComment: tableInfo.tableComment,
      serviceName: toPascalCase(tableInfo.tableName),
    };
    return templateParams;
  }
}
