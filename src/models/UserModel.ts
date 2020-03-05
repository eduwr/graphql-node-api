import { Table, Column, Model, DataType, BeforeCreate, HasMany } from 'sequelize-typescript';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import Post from './PostModel';
import Comment from './CommentModel';

@Table
class User extends Model<User> {
    @Column(DataType.TEXT)
    name!: string;

    @Column(DataType.TEXT)
    email!: string;

    @Column(DataType.TEXT)
    password!: string;

    @Column(DataType.BLOB)
    photo?: string;

    @HasMany(() => Post)
    posts: Post[];

    @HasMany(() => Comment)
    comments: Comment[];

    @BeforeCreate
    static createHash(instance: User): void {
        const salt = genSaltSync();
        instance.password = hashSync(instance.password, salt);
    }

    static checkPassword(encondedPassword: string, password: string): boolean {
        return compareSync(password, encondedPassword);
    }
}

export default User;
