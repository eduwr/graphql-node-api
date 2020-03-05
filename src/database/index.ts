import { Sequelize } from 'sequelize-typescript';
import DbConfig from '../config/config';
import User from '../models/UserModel';
import Post from '../models/PostModel';
import Comment from '../models/CommentModel';

const connection = new Sequelize(DbConfig[process.env.NODE_ENV]);

connection.addModels([User, Post, Comment]);

export default connection;
