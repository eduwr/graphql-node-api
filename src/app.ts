require('dotenv').config();

import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import schema from './graphql/schema';
import setContext from './middlewares/setContext';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
  }

  private middleware(): void {
    this.express.use(
      '/graphql',

      setContext,

      graphqlHTTP(req => ({
        schema,
        graphiql: process.env.NODE_ENV === 'development',
        context: req['context'],
      })),
    );
  }
}

export default new App().express;
