import { DataTypes, Model, Sequelize } from "sequelize";

export class ColumesModel extends Model {
};

export const initColumnsModel = (sequelize: Sequelize) => {
  ColumesModel.init({
    tableSchema: { type: DataTypes.STRING(64), comment: '表所属数据库' },
    tableName: { type: DataTypes.STRING(64), comment: '表名称' },
    columnName: { type: DataTypes.STRING(64), comment: '字段名称' },
    columnComment: { type: DataTypes.TEXT, comment: '字段注释' },
    dataType: { type: DataTypes.TEXT, comment: '数据类型' },
    characterMaximumLength: { type: DataTypes.BIGINT, comment: '字段长度' },
    isNullable: { type: DataTypes.STRING(3), comment: '是否可为NULL, YES/NO' },
    numericPrecision: { type: DataTypes.BIGINT, comment: '整数部分长度' },
    numericScale: { type: DataTypes.BIGINT, comment: '小数部分长度' },
    columnKey: {
      type: DataTypes.ENUM('', 'PRI', 'UNI', 'MUL'),
      comment: '字段类型',
    },
  }, {
    sequelize,
    modelName: 'columes',
    tableName: 'columes',
  });
  ColumesModel.removeAttribute('id');
}
