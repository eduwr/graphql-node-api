import Post from '../models/PostModel';
import Comment from '../models/CommentModel';
import User from '../models/UserModel';
export interface ModelsInterface {
    Post: Post;
    Comment: Comment;
    User: User;
}
