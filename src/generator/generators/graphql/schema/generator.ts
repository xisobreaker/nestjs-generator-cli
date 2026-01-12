import path from "path";
import { TableInfo } from "../../../table-query";
import { toCamelCase, toKebabCase, toPascalCase } from "../../../../common/case-utils";
import GeneratorComponent from "../../generator-component";
import { GeneratorConfig } from "../../../configure";
import { defaultColumn } from "../../../../common/default-column";

interface GqlSchemaTemplateParams {
  kebabName: string;
  pascalName: string;
  camelName: string;
  columnStr: string;
  foreignKeyStr: string;
  referenceStr: string;
}

export default class GqlSchemaGenerator extends GeneratorComponent {
  constructor() {
    super('.graphql', path.join(__dirname, 'template.ts.ejs'));
  }

  private convertDataType(type: string) {
    switch (type) {
      case 'int':
      case 'bigint':
        return 'Int';
      case 'decimal':
      case 'float':
      case 'double':
        return `Float`;
      case 'tinyint':
        return 'Boolean';
      case 'datetime':
        return 'Date';
      case 'json':
        return 'JSON';
      case 'nvarchar':
      case 'varchar':
      case 'blob':
      case 'date':
      case 'time':
      default:
        return 'String';
    }
  }

  private getColumnCodes(tableInfo: TableInfo) {
    const columnList: string[] = [];
    // 处理默认列
    defaultColumn.forEach((c) => {
      if (c.primaryKey) {
        columnList.push(`
  # ${c.comment}
  ${toCamelCase(c.name)}: ID`);
      } else {
        columnList.push(`
  # ${c.comment}
  ${toCamelCase(c.name)}: ${this.convertDataType(c.type)}`);
      }
    })
    tableInfo.columns.forEach((col) => {
      if (defaultColumn.find(c => c.name === col.columnName)) {
        return;
      }

      if (col.columnKey !== '') {
        columnList.push(`
  # ${col.columnComment}
  ${toCamelCase(col.columnName)}: ID`);
      } else {
        columnList.push(`
  # ${col.columnComment}
  ${toCamelCase(col.columnName)}: ${this.convertDataType(col.dataType)}`);
      }
    });
    return columnList;
  }

  private getForeignKeyCodes(tableInfo: TableInfo) {
    const foreignKeyList: string[] = [];
    tableInfo.foreignKeys.forEach(rc => {
      const fieldName = toCamelCase(rc.keyColumnUsage.columnName);
      foreignKeyList.push(`
  ${fieldName}Obj: ${toPascalCase(rc.referencedTableName)}`);
    });
    return foreignKeyList;
  }

  private getReferenceCodes(tableInfo: TableInfo) {
    const referenceList: string[] = [];
    tableInfo.references.forEach((rc) => {
      const fieldName = `${toCamelCase(rc.keyColumnUsage.tableName)}${toPascalCase(rc.keyColumnUsage.columnName)}`;
      referenceList.push(`
  ${fieldName}: [${toPascalCase(rc.keyColumnUsage.tableName)}]`);
    });
    return referenceList;
  }

  protected operator(tableInfo: TableInfo, configParam: GeneratorConfig): Record<string, any> {
    const kebabName = toKebabCase(tableInfo.tableName);
    const pascalName = toPascalCase(tableInfo.tableName);
    const camelName = toCamelCase(tableInfo.tableName);

    const columnStr = this.getColumnCodes(tableInfo).join('');
    const foreignKeyStr = this.getForeignKeyCodes(tableInfo).join('');
    const referenceStr = this.getReferenceCodes(tableInfo).join('');
    const templateParams: GqlSchemaTemplateParams = {
      kebabName,
      pascalName,
      camelName,
      columnStr,
      foreignKeyStr,
      referenceStr,
    };
    return templateParams;
  }
}
