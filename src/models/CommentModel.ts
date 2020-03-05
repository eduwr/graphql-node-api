import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './UserModel';
import Post from './PostModel';

@Table
class Comment extends Model<Comment> {
  @Column(DataType.STRING)
  comment!: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Post)
  @Column
  postId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Post)
  post: Post;
}

export default Comment;
