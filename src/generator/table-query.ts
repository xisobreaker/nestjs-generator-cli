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

interface TableInfo {
  tableName: string;
  tableComment: string;
  columns: ColumnInfo[];
  foreignKeys: ForeignKey[];
  references: Reference[];
};

export const queryTables = async (sequelize: Sequelize, table: any): Promise<TableInfo> => {
  const tableInfo = {} as TableInfo;
  return tableInfo;
}