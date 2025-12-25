import { DataTypes, Model, Sequelize } from "sequelize";

export class TablesModel extends Model {
};

export const initTablesModel = (sequelize: Sequelize) => {
  TablesModel.init({
    tableSchema: { type: DataTypes.STRING(64), comment: '表所属数据库' },
    tableName: { type: DataTypes.STRING(64), comment: '表名称' },
    tableComment: { type: DataTypes.TEXT, comment: '表注释' },
  }, {
    sequelize,
    modelName: 'tables',
    tableName: 'tables',
  });
  TablesModel.removeAttribute('id');
};