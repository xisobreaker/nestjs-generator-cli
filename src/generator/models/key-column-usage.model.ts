import { DataTypes, Model, Sequelize } from "sequelize";

export class KeyColumnUsageModel extends Model {
};

export const initKeyColumnUsageModel = (sequelize: Sequelize) => {
  KeyColumnUsageModel.init({
    constraintSchema: { type: DataTypes.STRING(64), comment: '约束所属数据库' },
    constraintName: { type: DataTypes.STRING(64), comment: '约束名称' },
    tableSchema: { type: DataTypes.STRING(64), comment: '表所属数据库' },
    tableName: { type: DataTypes.STRING(64), comment: '表名称' },
    columnName: { type: DataTypes.STRING(64), comment: '字段名称' },
    referencedTableName: {
      type: DataTypes.STRING(64),
      comment: '：约束引用的表的名称',
    },
    referencedColumnName: {
      type: DataTypes.STRING(64),
      comment: '：约束引用的表的名称',
    },
  }, {
    sequelize,
    modelName: 'key_column_usage',
    tableName: 'key_column_usage',
  });
  KeyColumnUsageModel.removeAttribute('id');
};