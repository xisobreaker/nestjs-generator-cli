import path from "path";
import { TableInfo } from "../../table-query";
import { toCamelCase, toKebabCase, toPascalCase } from "../../../common/case-utils";
import GeneratorComponent from "../generator-component";
import { GeneratorConfig } from "../../configure";
import { Columns } from "../../models/columns.model";

interface InterfaceTemplateParams {
  kebabName: string;
  pascalName: string;
  camelName: string;
  tableName: string;
  tableComment: string;
  columnStr: string;
}

export default class InterfaceGenerator extends GeneratorComponent {
  constructor() {
    super('.interface.ts', path.join(__dirname, 'template.ts.ejs'));
  }

  private convertDataType(col: Columns) {
    switch (col.dataType) {
      case 'int':
      case 'bigint':
      case 'decimal':
      case 'float':
      case 'double':
        return `number`;
      case 'datetime':
        return `Date`;
      case 'json':
        return 'Record<string, any>';
      case 'nvarchar':
      case 'varchar':
      case 'blob':
      case 'date':
      case 'time':
      default:
        return 'string';
    }
  }

  private getColumnCodes(tableInfo: TableInfo) {
    const columnList: string[] = [];
    tableInfo.columns.forEach((col) => {
      columnList.push(`
  ${toCamelCase(col.columnName)}: ${this.convertDataType(col)}`);
    });
    return columnList;
  }

  protected operator(tableInfo: TableInfo, configParam: GeneratorConfig): Record<string, any> {
    const kebabName = toKebabCase(tableInfo.tableName);
    const pascalName = toPascalCase(tableInfo.tableName);
    const camelName = toCamelCase(tableInfo.tableName);

    const columnStr = this.getColumnCodes(tableInfo).join('');
    const templateParams: InterfaceTemplateParams = {
      kebabName,
      pascalName,
      camelName,
      tableName: tableInfo.tableName,
      tableComment: tableInfo.tableComment,
      columnStr,
    };
    return templateParams;
  }
}
