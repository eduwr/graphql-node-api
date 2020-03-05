import { Sequelize } from 'sequelize-typescript';
import DbConfig from '../config/config';

const connection = new Sequelize(DbConfig[process.env.NODE_ENV]);

export default connection;
