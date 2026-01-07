import { Columns } from "../generator/models/columns.model";

export const toTypescriptType = (c: Columns) => {
  switch (c.dataType) {
    case 'nvarchar':
    case 'varchar':
    case 'blob':
    case 'date':
    case 'time':
      return 'string';
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
  }
}

export const toMysqlDataType = (c: Columns) => {
  switch (c.dataType) {
    case 'nvarchar':
    case 'varchar':
    case 'blob':
      return `STRING(${c.characterMaximumLength})`;
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
}