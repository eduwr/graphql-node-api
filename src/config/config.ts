import { resolve } from 'path';

const DbConfig: object = {
  development: {
    dialect: 'mysql',
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    storage: ':memory:',
    models: [resolve(__dirname, '..', 'models')], // or [Player, Team],
    define: {
      timestamps: true,
    },
  },
};

export default DbConfig;
