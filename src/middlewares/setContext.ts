import connection from '../database';

const setContext = (req, res, next): void => {
  req['context'] = {};
  req['context'].db = connection;
  next();
};

export default setContext;
