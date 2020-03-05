import Comment from '../../../models/CommentModel';
import User from '../../../models/UserModel';
import Post from '../../../models/PostModel';
import { Transaction } from 'sequelize/types';
import { handleError } from '../../../utils/utils';

export const commentResolvers = {
  Comment: {
    user: (comment: Comment, args, { db }): User => {
      return db.User.findById(comment.get('user')).catch(handleError);
    },
    post: (comment: Comment, args, { db }): Post => {
      return db.Post.findById(comment.get('post')).catch(handleError);
    },
  },

  Query: {
    commentsByPost: (parent, { postId, first = 10, offset = 0 }, { db }): Comment => {
      postId = parseInt(postId);
      return db.Comment.findAll({
        where: { post: postId },
        limit: first,
        offset,
      }).catch(handleError);
    },
  },

  Mutation: {
    createComment: (parent, { input }, { db }): Comment => {
      return db.sequelize
        .transaction((t: Transaction) => {
          return db.Comment.create(input, { transaction: t });
        })
        .catch(handleError);
    },

    updateComment: (parent, { id, input }, { db }): Comment => {
      id = parseInt(id);
      return db.sequelize
        .transaction((t: Transaction) => {
          return db.Comment.findById(id).then((comment: Comment) => {
            if (!comment) throw new Error(`Comment with id ${id} not found!`);
            return comment.update(input, { transaction: t });
          });
        })
        .catch(handleError);
    },

    deleteComment: (parent, { id }, { db }): boolean => {
      id = parseInt(id);
      return db.sequelize
        .transaction((t: Transaction) => {
          return db.Comment.findById(id).then((comment: Comment) => {
            if (!comment) throw new Error(`Comment with id ${id} not found!`);
            return comment.destroy({ transaction: t }).then(() => !!comment);
          });
        })
        .catch(handleError);
    },
  },
};
