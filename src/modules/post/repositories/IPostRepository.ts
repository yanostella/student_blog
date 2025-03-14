import { Post } from "../entities/Post";

export interface IPostRepository {
    getPosts(limit: number, page: number): Promise<Post[]>;
    getPostById(id: number): Promise<Post | null>;
    createPost(post: Post): Promise<Post>;
    updatePost(id: number, post: Partial<Post>): Promise<Post | null>;
    deletePost(id: number): Promise<void>;
    searchPosts(keyword: string): Promise<Post[]>;
}