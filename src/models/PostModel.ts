import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import User from './UserModel';
import Comment from './CommentModel';

@Table
class Post extends Model<Post> {
    @Column(DataType.STRING)
    title!: string;

    @Column(DataType.TEXT)
    content!: string;

    @Column(DataType.TEXT)
    photo!: string;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => Comment)
    comments: Comment[];
}

export default Post;
