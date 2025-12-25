import { Database } from "./database";
import { initColumnsModel } from "./models/colume.model";
import { initKeyColumnUsageModel } from "./models/key-column-usage.model";
import { initReferentialConstraintsModel } from "./models/referential-constraints.model";
import { initTablesModel, TablesModel } from "./models/table.model";

function getDBConfig() {

}

export const generateCode = async () => {
  const db = new Database({
    host: 'localhost',
    port: 3306,
    username: 'develop',
    password: 'password',
    database: 'information_schema',
    dialect: 'mysql',
  });
  const sequelize = db.getSequelize();
  initTablesModel(sequelize);
  initColumnsModel(sequelize);
  initKeyColumnUsageModel(sequelize);
  initReferentialConstraintsModel(sequelize);

  const tables = await TablesModel.findAll();
  console.log(tables);
};
