import { Like, Repository } from "typeorm";
import { IPostRepository } from "./IPostRepository";
import { Post } from "../entities/Post";
import { AppDataSource } from "../../../config/data-source";

export class PostRepository implements IPostRepository{
    private repository: Repository<Post>;

    constructor() {
        this.repository = AppDataSource.getRepository(Post);
    }

    async getPosts(limit: number, page: number): Promise<Post[]> {
        return this.repository.find({
            relations: ['user'],
            take: limit,
            skip: (page - 1) * limit
        })
    }

    async getPostById(id: number): Promise<Post | null> {
        return this.repository.findOne({
            relations: ['user'],
            where: { id}
        })
    }

    async createPost(post: Post): Promise<Post> {
        return this.repository.save(post);
    }

    async updatePost(id: number, post: Partial<Post>): Promise<Post | null> {
        this.repository.update(id, post);
        return this.getPostById(id);
    }

    async deletePost(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    async searchPosts(keyword: string): Promise<Post[]> {
        return this.repository.find({
            relations: ['user'],
            where: [
                { title: Like(`%${keyword}%`) },
                { sub_title: Like(`%${keyword}%`) },
                { content: Like(`%${keyword}%`) }
            ]
        });
    }
}