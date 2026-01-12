import path from "path";
import { toCamelCase, toKebabCase, toPascalCase } from "../../../common/case-utils";
import { TableInfo } from "../../table-query";
import GeneratorComponent from "../generator-component";
import { GeneratorConfig } from "../../configure";
import { Columns } from "../../models/columns.model";
import { defaultColumn } from "../../../common/default-column";

interface ModelTemplateParams {
  kebabName: string;
  pascalName: string;
  camelName: string;
  tableName: string;
  tableComment: string;
  columnStr: string;
}

export default class ModelGenerator extends GeneratorComponent {
  constructor() {
    super('.model.ts', path.join(__dirname, 'template.ts.ejs'));
  }

  private getSequelizeType(column: Columns) {
    switch (column.dataType) {
      case 'nvarchar':
      case 'varchar':
      case 'blob':
        return `STRING(${column.characterMaximumLength})`;
      case 'date':
        return `DATEONLY`;
      case 'time':
        return 'TIME';
      case 'int':
        return `INTEGER`;
      case 'bigint':
        return 'BIGINT';
      case 'decimal':
        return `DECIMAL`;
      case 'float':
        return 'FLOAT';
      case 'double':
        return 'DOUBLE';
      case 'datetime':
        return 'DATE';
      case 'json':
        return 'JSON';
      case 'tinyint':
        return 'BOOLEAN';
    }
  };

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

  private getImportModels(tableInfo: TableInfo) {
    const importModels: string[] = [];
    tableInfo.foreignKeys.forEach(fk => {
      if (fk.referencedTableName !== tableInfo.tableName) {
        if (!importModels.includes(fk.referencedTableName)) {
          importModels.push(toPascalCase(fk.referencedTableName));
        }
      }
    });
  }

  private getColumnCodes(tableInfo: TableInfo) {
    const columnList: string[] = [];
    tableInfo.columns.forEach((col) => {
      if (!defaultColumn.find(c => c.name === col.columnName)) {
        columnList.push(`
  @Column({
    type: DataType.${this.getSequelizeType(col)},
    comment: '${col.columnComment}',
  })
  declare ${toCamelCase(col.columnName)}: ${this.convertDataType(col)};`);
      }
    });
    return columnList;
  }

  private getForeignKeyCodes(tableInfo: TableInfo) {
    const foreignKeyList: string[] = [];
    tableInfo.foreignKeys.forEach(rc => {
      const fieldName = toCamelCase(rc.keyColumnUsage.columnName);
      foreignKeyList.push(`
  @BelongsTo(() => ${toPascalCase(rc.referencedTableName)}Model, '${fieldName}')
  ${fieldName}Obj: ${toPascalCase(rc.referencedTableName)}Model;`);
    });
    return foreignKeyList;
  }

  private getReferenceCodes(tableInfo: TableInfo) {
    const referencesList: string[] = [];
    tableInfo.references.forEach(rc => {
      const fieldName = `${toCamelCase(rc.keyColumnUsage.tableName)}${toPascalCase(rc.keyColumnUsage.columnName)}`;
      referencesList.push(`
  @HasMany(() => ${toPascalCase(rc.keyColumnUsage.tableName)}Model, '${rc.keyColumnUsage.columnName}')
  ${fieldName}: Array<${toPascalCase(rc.keyColumnUsage.tableName)}Model>;`);
    });
    return referencesList;
  }

  protected operator(tableInfo: TableInfo, configParam: GeneratorConfig): Record<string, any> {
    const kebabName = toKebabCase(tableInfo.tableName);
    const pascalName = toPascalCase(tableInfo.tableName);
    const camelName = toCamelCase(tableInfo.tableName);

    const fieldList = [];
    fieldList.push(...this.getColumnCodes(tableInfo));
    fieldList.push(...this.getForeignKeyCodes(tableInfo));
    fieldList.push(...this.getReferenceCodes(tableInfo));
    const columnStr = fieldList.join('\n');

    const templateParams: ModelTemplateParams = {
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
