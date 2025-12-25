import { DataTypes, Model, Sequelize } from "sequelize";

export class ReferentialConstraintsModel extends Model {
};

export const initReferentialConstraintsModel = (sequelize: Sequelize) => {
  ReferentialConstraintsModel.init({
    constraintSchema: { type: DataTypes.STRING(64), comment: '约束所属数据库' },
    constraintName: { type: DataTypes.STRING(64), comment: '约束名称' },
    updateRule: {
      type: DataTypes.ENUM(
        'NO ACTION',
        'RESTRICT',
        'CASCADE',
        'SET NULL',
        'SET DEFAULT',
      ),
      comment: '约束ON UPDATE属性的值',
    },
    deleteRule: {
      type: DataTypes.ENUM(
        'NO ACTION',
        'RESTRICT',
        'CASCADE',
        'SET NULL',
        'SET DEFAULT',
      ),
      comment: '约束ON DELETE属性的值',
    },
    tableName: { type: DataTypes.STRING(64), comment: '表名称' },
    referencedTableName: {
      type: DataTypes.STRING(64),
      comment: '：约束引用的表的名称',
    },
  }, {
    sequelize,
    modelName: 'referential_constraints',
    tableName: 'referential_constraints',
  });
  ReferentialConstraintsModel.removeAttribute('id');
};