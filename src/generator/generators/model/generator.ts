import path from "path";
import { toPascalCase } from "../../../common/case-utils";
import { TableInfo } from "../../table-query";
import GeneratorComponent from "../generator-component";
import { GeneratorConfig } from "../../configure";

interface ModelTemplateParams {
  tableName: string;
  tableComment: string;
  modelName: string;
}

export default class ModelGenerator extends GeneratorComponent {
  constructor() {
    super('.model.ts', path.join(__dirname, 'template.ts.ejs'));
  }

  protected operator(tableInfo: TableInfo, configParam: GeneratorConfig): Record<string, any> {
    const templateParams: ModelTemplateParams = {
      tableName: tableInfo.tableName,
      tableComment: tableInfo.tableComment,
      modelName: toPascalCase(tableInfo.tableName),
    };
    return templateParams;
  }
}
