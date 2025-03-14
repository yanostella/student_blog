import { NotFoundError } from "shared/error/NotFoundError";
import { IPostRepository } from "../repositories/IPostRepository";
import { Post } from "../entities/Post";
import { IUserRepository } from "modules/user/repositories/IUserRepository";
import { ProfileRole } from "modules/user/entities/User";
import { UnauthorizedError } from "shared/error/UnauthorizedError";
import { AppError } from "shared/error/AppError";

export class PostService {
    constructor(
        private postRepository: IPostRepository, 
        private userRepository: IUserRepository
    ) {}

    async getPosts(limit: number, page: number) {
        return this.postRepository.getPosts(limit, page);
    }

    async getPostById(id: number) {
        const post = await this.postRepository.getPostById(id);
        if (!post) {
            throw new NotFoundError('Post with this id');
        }
        return post;
    }

    async createPost(post: Post) {
        const user = await this.userRepository.getUserById(post.user_id);
        if (!user) {
            throw new NotFoundError('User with this id')
        }
        if (user.profile_role !== ProfileRole.PROFESSOR) {
            throw new UnauthorizedError();
        }
        if (!post.title || !post.content) {
            throw new AppError('Title and content are required', 400);
        }
        return this.postRepository.createPost(post);

    }

    async updatePost(id: number, post: Partial<Post>) {
        await this.getPostById(id);
        return this.postRepository.updatePost(id, post);
    }

    async deletePost(id: number) {
        await this.getPostById(id);
        return this.postRepository.deletePost(id);
    }

    async searchPosts(keyword: string) {
        const posts = await this.postRepository.searchPosts(keyword.trim());
        if (!posts.length) {
            throw new NotFoundError('Posts with this keyword');
        }
        return posts;
    }
}