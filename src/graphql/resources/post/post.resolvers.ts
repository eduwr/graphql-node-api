import Post from '../../../models/PostModel';
import User from '../../../models/UserModel';
import Comment from '../../../models/CommentModel';
import { Transaction } from 'sequelize/types';
import { handleError } from '../../../utils/utils';

export const postResolvers = {
  Post: {
    author: (parent: Post, args, { db }): User => {
      return db.User.findById(parent.get('author')).catch(handleError);
    },

    comments: (parent: Post, { first = 10, offset = 0 }, { db }): [Comment] => {
      return db.Post.findAll({
        where: { post: parent.get('id') },
        limit: first,
        offset,
      }).catch(handleError);
    },
  },

  Query: {
    posts: (parent, { first = 10, offset = 0 }, { db }): [Post] => {
      return db.Post.findAll({
        limit: first,
        offset,
      }).catch(handleError);
    },

    post: (parent, { id }, { db }): Post => {
      id = parseInt(id);
      return db.Post.findById(id)
        .then((post: Post) => {
          if (!post) throw new Error(`Post with id ${id} not found!`);
        })
        .catch(handleError);
    },
  },

  Mutation: {
    createPost: (parent, { input }, { db }): Post => {
      return db.sequelize
        .transaction((t: Transaction) => {
          return db.Post.create(input, { transaction: t });
        })
        .catch(handleError);
    },

    updatePost: (parent, { id, input }, { db }): Post => {
      id = parseInt(id);
      return db.sequelize
        .transaction((t: Transaction) => {
          return db.Post.findById(id).then((post: Post) => {
            if (!post) throw new Error(`Post with id: ${id} not found!`);
            return post.update(input, { transaction: t });
          });
        })
        .catch(handleError);
    },

    deletePost: (parent, { id }, { db }): boolean => {
      id = parseInt(id);
      return db.sequelize
        .transaction((t: Transaction) => {
          return db.Post.findById(id).then((post: Post) => {
            if (!post) throw new Error(`Post with id: ${id} not found!`);
            return post.destroy({ transaction: t }).then(() => !!post);
          });
        })
        .catch(handleError);
    },
  },
};
