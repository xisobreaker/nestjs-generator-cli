import { Sequelize } from "sequelize";

export interface DatabaseConfig {
  database: string;
  username: string;
  password: string;
  host: string;
  port: number;
  dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle';
}

export class Database {
  private sequelize: Sequelize;
  private isConnected: boolean = false;

  constructor(config: DatabaseConfig) {
    this.sequelize = new Sequelize({
      dialect: config.dialect,
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      storage: ':memory:',
      timezone: '+08:00',
      define: {
        timestamps: false,
        charset: 'utf8',
        underscored: true,
      },
      dialectOptions: {},
    });
  }

  /**
   * 连接数据库
   */
  public async connect(): Promise<boolean> {
    try {
      await this.sequelize.authenticate();
      this.isConnected = true;
      console.log('✅ 数据库连接成功');
    } catch (error) {
      this.isConnected = false;
      console.error('❌ 数据库连接失败:', error);
      throw error;
    }
    return true;
  }

  /**
  * 断开数据库连接
  */
  public async disconnect(): Promise<void> {
    try {
      await this.sequelize.close();
      this.isConnected = false;
      console.log('✅ 数据库连接已断开');
    } catch (error) {
      console.error('❌ 断开数据库连接失败:', error);
      throw error;
    }
  }

  /**
   * 检查数据库连接状态
   */
  public async checkConnection(): Promise<boolean> {
    try {
      await this.sequelize.authenticate();
      this.isConnected = true;
      return true;
    } catch (error) {
      this.isConnected = false;
      return false;
    }
  }

  /**
   * 获取当前连接状态
   */
  public getConnectionStatus(): boolean {
    return this.isConnected;
  }

  /**
   * 获取 Sequelize 实例
   */
  public getSequelize(): Sequelize {
    return this.sequelize;
  }
}