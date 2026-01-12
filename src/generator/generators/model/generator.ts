import path from "path";
import { toCamelCase, toKebabCase, toPascalCase } from "../../../common/case-utils";
import { foreignKeyConstraint, referenceConstraint, TableInfo } from "../../table-query";
import GeneratorComponent from "../generator-component";
import { GeneratorConfig } from "../../configure";
import { Columns } from "../../models/columns.model";
import { ReferentialConstraint } from "../../models/referential-constraints.model";
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

  private columnTemplate(col: Columns) {
    if (defaultColumn.find(c => c.name === col.columnName)) {
      return '';
    }
    return `
  @Column({
    type: DataType.${this.getSequelizeType(col)},
    comment: '${col.columnComment}',
  })
  declare ${toCamelCase(col.columnName)}: ${this.convertDataType(col)};`;
  }

  private foreignKeyTemplate(foreignKey: ReferentialConstraint) {
    const constraint = foreignKeyConstraint(foreignKey);
    return `
  @BelongsTo(() => ${toPascalCase(constraint.tableName)}Model, '${constraint.referenceColName}')
  ${constraint.fieldName}Obj: ${toPascalCase(constraint.tableName)}Model;`;
  }

  private referenceTemplate(reference: ReferentialConstraint) {
    const constraint = referenceConstraint(reference);
    return `
  @HasMany(() => ${toPascalCase(constraint.tableName)}Model, '${constraint.tableColName}')
  ${constraint.fieldName}: Array<${toPascalCase(constraint.tableName)}Model>;`;
  }

  protected operator(tableInfo: TableInfo, configParam: GeneratorConfig): Record<string, any> {
    const kebabName = toKebabCase(tableInfo.tableName);
    const pascalName = toPascalCase(tableInfo.tableName);
    const camelName = toCamelCase(tableInfo.tableName);

    const fieldList = [];
    fieldList.push(...tableInfo.columns.map(col => this.columnTemplate(col)).filter(col => col !== ''));
    fieldList.push(...tableInfo.foreignKeys.map(fk => this.foreignKeyTemplate(fk)).filter(fk => fk !== ''));
    fieldList.push(...tableInfo.references.map(ref => this.referenceTemplate(ref)).filter(ref => ref !== ''));

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
