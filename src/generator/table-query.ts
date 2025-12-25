import { Sequelize } from "sequelize";

interface ForeignKey {

};

interface Reference {
  tableName: string;
  referencedTableName: string;
  constraintSchema: string;
  constraintName: string;
  updateRule: "NO ACTION" | "RESTRICT" | "CASCADE" | "SET NULL" | "SET DEFAULT";
  deleteRule: "NO ACTION" | "RESTRICT" | "CASCADE" | "SET NULL" | "SET DEFAULT";
};

interface ColumnInfo {
  columnName: string;
  columnComment: string;
  dataType: string;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
  foreignKeyTable: string;
  foreignKeyColumn: string;
};

export interface TableInfo {
  tableName: string;
  tableComment: string;
  columns: ColumnInfo[];
  foreignKeys: ForeignKey[];
  references: Reference[];
};

export const queryTables = async (sequelize: Sequelize, tableName: string): Promise<TableInfo> => {
  const tableInfo = {
    tableName,
    tableComment: '',
    columns: [],
    foreignKeys: [],
    references: [],
  } as TableInfo;
  return tableInfo;
}