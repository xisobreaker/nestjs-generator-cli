import path from "path";
import { toPascalCase } from "../../../common/case-utils";
import { TableInfo } from "../../table-query";
import AbstractGenerator from "../abstract-generator";

interface ModelTemplateParams {
  tableName: string;
  tableComment: string;
  modelName: string;
}

export default class ModelGenerator extends AbstractGenerator {
  constructor() {
    super('.model.ts', path.join(__dirname, 'template.ts.ejs'));
  }

  protected operator(tableInfo: TableInfo): Record<string, any> {
    const templateParams: ModelTemplateParams = {
      tableName: tableInfo.tableName,
      tableComment: tableInfo.tableComment,
      modelName: toPascalCase(tableInfo.tableName),
    };
    return templateParams;
  }
}
