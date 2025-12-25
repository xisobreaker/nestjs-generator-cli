import path from "path";
import { Database, DatabaseConfig } from "./database";
import { initColumnsModel } from "./models/colume.model";
import { initKeyColumnUsageModel } from "./models/key-column-usage.model";
import { initReferentialConstraintsModel } from "./models/referential-constraints.model";
import { initTablesModel, TablesModel } from "./models/table.model";
import { existsSync, readFileSync } from "fs";
import { checkboxPrompt } from "../common/cli-utils";
import { Op } from "sequelize";

/**
 * 获取数据库配置
 */
function getDBConfig(): DatabaseConfig {
  const sequelizerc_file = path.resolve(process.cwd() + '/.sequelizerc');
  if (!existsSync(sequelizerc_file)) {
    throw new Error(`sequelizerc file not found: ${sequelizerc_file}`);
  }
  const sequelizerc_content = require(sequelizerc_file);
  const configPath = sequelizerc_content.config;
  if (!existsSync(configPath)) {
    throw new Error(`database config file not found: ${configPath}`);
  }
  const config = JSON.parse(readFileSync(configPath, 'utf8'));
  const env = process.env.NODE_ENV || 'development';
  if (!config[env]) {
    throw new Error(`database config for env ${env} not found`);
  }

  return {
    username: config[env].username,
    password: config[env].password,
    host: config[env].host,
    port: config[env].port,
    database: config[env].database,
    dialect: config[env].dialect,
  };
}

/**
 * 选择数据库表
 */
const choiceTables = async (tableSchema: string) => {
  const tables = await TablesModel.findAll({
    where: {
      table_schema: tableSchema,
      table_name: {
        [Op.notIn]: ['sequelize_data', 'sequelize_meta'],
      },
    },
  }).then((tables) => {
    return tables.map((table) => table.dataValues);
  });

  return await checkboxPrompt('请选择要生成代码的数据库表', tables.map((table) => ({
    key: `${table.tableName} -> ${table.tableComment}`,
    value: table,
  }))).then((ret) => ret.map((o) => o.value));
}

/**
 * 选择要生成的代码类型
 */
const choiceTemplates = async () => {
  return await checkboxPrompt('请选择要生成的代码类型', [
    {
      key: 'entity',
      value: 'entity',
    },
    {
      key: 'service',
      value: 'service',
    },
    {
      key: 'controller',
      value: 'controller',
    },
  ]);
}

export const generateCode = async () => {
  // 初始化数据库连接
  const dbconfig = getDBConfig();
  const db = new Database({ ...dbconfig, database: 'information_schema' });
  const sequelize = db.getSequelize();
  initTablesModel(sequelize);
  initColumnsModel(sequelize);
  initKeyColumnUsageModel(sequelize);
  initReferentialConstraintsModel(sequelize);
  await db.connect();

  // 选择数据库表
  const tables = await choiceTables(dbconfig.database);
  const templates = await choiceTemplates();

  await db.disconnect();
};
