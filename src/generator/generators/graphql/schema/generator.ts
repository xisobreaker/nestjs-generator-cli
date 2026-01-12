import path from "path";
import { foreignKeyConstraint, referenceConstraint, TableInfo } from "../../../table-query";
import { toCamelCase, toKebabCase, toPascalCase } from "../../../../common/case-utils";
import GeneratorComponent from "../../generator-component";
import { GeneratorConfig } from "../../../configure";
import { Columns } from "../../../models/columns.model";
import { ReferentialConstraint } from "../../../models/referential-constraints.model";

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

  private convertDataType(col: Columns) {
    switch (col.dataType) {
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

  private columnTemplate(col: Columns) {
    if (col.columnName === 'id') {
      return `
  ${toCamelCase(col.columnName)}: ID`;
    }
    return `
  # ${col.columnComment}
  ${toCamelCase(col.columnName)}: ${this.convertDataType(col)}`;
  }

  private foreignKeyTemplate(foreignKey: ReferentialConstraint) {
    const constraint = foreignKeyConstraint(foreignKey);
    return `
  ${constraint.fieldName}Obj: ${toPascalCase(constraint.tableName)}`;
  }

  private referenceTemplate(reference: ReferentialConstraint) {
    const constraint = referenceConstraint(reference);
    return `
  ${constraint.fieldName}: [${toPascalCase(constraint.tableName)}]`;
  }

  protected operator(tableInfo: TableInfo, configParam: GeneratorConfig): Record<string, any> {
    const kebabName = toKebabCase(tableInfo.tableName);
    const pascalName = toPascalCase(tableInfo.tableName);
    const camelName = toCamelCase(tableInfo.tableName);

    const columnStr = tableInfo.columns.map((col) => this.columnTemplate(col)).join('');
    const foreignKeyStr = tableInfo.foreignKeys.map((foreignKey) => this.foreignKeyTemplate(foreignKey)).join('');
    const referenceStr = tableInfo.references.map((reference) => this.referenceTemplate(reference)).join('');
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
