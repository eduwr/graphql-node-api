import User from '../../../models/UserModel';
import { Transaction } from 'sequelize/types';
import { handleError } from '../../../utils/utils';
export const userResolvers = {
  User: {
    posts: (parent: User, { first = 10, offset = 0 }, { db }): [] => {
      return db.Post.findAll({
        where: { author: parent.get('id') },
        limit: first,
        offset,
      }).catch(handleError);
    },
  },

  Query: {
    users: (parent, { first = 10, offset = 0 }, { db }): [] => {
      return db.User.findAll({
        limit: first,
        offset,
      }).catch(handleError);
    },

    user: (parent, { id }, { db }): User => {
      id = parseInt(id);
      return db.User.findById(id)
        .then(user => {
          if (!user) throw new Error(`User with id ${id} not found!`);
          return user;
        })
        .catch(handleError);
    },
  },

  Mutation: {
    createUser: (parent, { input }, { db }): User => {
      return db.sequelize
        .transaction((t: Transaction) => {
          return db.User.create(input, {
            transaction: t,
          });
        })
        .catch(handleError);
    },

    updateUser: (parent, { id, input }, { db }): User => {
      id = parseInt(id);
      return db.sequelize
        .transaction((t: Transaction) => {
          return db.User.findById(id).then((user: User) => {
            if (!user) throw new Error(`User with id ${id} not found!`);
            return user.update(input, { transaction: t });
          });
        })
        .catch(handleError);
    },

    updateUserPass: (parent, { id, input }, { db }): boolean => {
      id = parseInt(id);
      return db.sequelize
        .transaction((t: Transaction) => {
          return db.User.findById(id).then((user: User) => {
            if (!user) throw new Error(`User with id ${id} not found!`);
            return user.update(input, { transaction: t }).then((user: User) => !!user);
          });
        })
        .catch(handleError);
    },

    deleteUser: (parent, { id }, { db }): boolean => {
      id = parseInt(id);
      return db.sequelize
        .transaction((t: Transaction) => {
          return db.User.findById(id).then((user: User) => {
            if (!user) throw new Error(`User with id ${id} not found!`);
            return user.destroy({ transaction: t }).then(() => !!user);
          });
        })
        .catch(handleError);
    },
  },
};
