import 'dotenv/config';
import { Sequelize } from 'sequelize';
const DBConfig = require('../config/config');

const env = process.env.NODE_ENV || 'development';

const config = (DBConfig as any)[env];

export default new Sequelize(
  process.env[config.use_env_variable] as string,
  {
    dialect: config.dialect as 'postgres',
    logging: config.logging,
  }
);
