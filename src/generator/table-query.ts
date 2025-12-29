import { ReferentialConstraint, ReferentialConstraintsModel } from "./models/referential-constraints.model";
import { Columns, ColumnsModel } from "./models/columns.model";
import _ from "lodash";
import Bb from 'bluebird';
import { KeyColumnUsageModel } from "./models/key-column-usage.model";

export interface TableInfo {
  tableName: string;
  tableComment: string;
  columns: Columns[];
  foreignKeys: ReferentialConstraint[];
  references: ReferentialConstraint[];
};

const queryTableColumns = async (dbName: string, tableName: string) => {
  return ColumnsModel.findAll({
    where: {
      tableSchema: dbName,
      tableName,
    },
  }).then((columns) => {
    return columns.map((column) => column.dataValues);
  });
}

/**
 * @brief 查询表的约束信息
 * 
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @param type 约束类型
 * @returns 
 */
const queryReferentialConstraints = async (dbName: string, tableName: string, type: 'foreignKeys' | 'references') => {
  const whereOptions = { constraintSchema: dbName };
  if (type === 'foreignKeys') {
    _.set(whereOptions, 'tableName', tableName);
  } else {
    _.set(whereOptions, 'referencedTableName', tableName);
  }

  const referentialConstraints = await ReferentialConstraintsModel.findAll({
    where: whereOptions,
  }).then((referentialConstraints) => {
    return referentialConstraints.map((referentialConstraint) => referentialConstraint.dataValues);
  });

  return Bb.map(referentialConstraints, async (p) => {
    const keyColumnUsage = await KeyColumnUsageModel.findOne({
      where: {
        constraintSchema: p.constraintSchema,
        constraintName: p.constraintName,
      }
    }).then((ret) => ret?.dataValues || {});
    return { ...p, keyColumnUsage };
  });
}

export const queryTableDetails = async (dbName: string, tableName: string, tableComment: string): Promise<TableInfo> => {
  return Bb.props({
    tableName,
    tableComment,
    columns: queryTableColumns(dbName, tableName),
    foreignKeys: queryReferentialConstraints(dbName, tableName, 'foreignKeys'),
    references: queryReferentialConstraints(dbName, tableName, 'references'),
  });
}