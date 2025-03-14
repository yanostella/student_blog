import { UserRepository } from './../../user/repositories/UserRepository';
import { PostRepository } from "../repositories/PostRepository";
import { PostService } from "../services/PostService";
import { Request, Response } from 'express';
import { Post } from '../entities/Post';
import { AppError } from 'shared/error/AppError';

const postRepository = new PostRepository();
const userRepository = new UserRepository();
const postService = new PostService(postRepository, userRepository);

export class PostController {
    
    async getPosts(req: Request, res: Response) {
        try {
            const { limit, page } = req.query;
            const posts = await postService.getPosts(Number(limit), Number(page));
            res.status(200).json(posts);
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message });
        }
    }

    async getPostById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const post = await postService.getPostById(Number(id));
            return res.status(200).json(post);
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message });
        }
    }

    async createPost(req: Request, res: Response) {
        try {
            const post: Post = req.body;
            const newPost = await postService.createPost(post);
            return res.status(201).json(newPost);
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message });
        }
    }

    async updatePost(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const post: Partial<Post> = req.body;
            const updatedPost = await postService.updatePost(Number(id), post);
            return res.status(200).json(updatedPost);
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message });
        }
    }

    async deletePost(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await postService.deletePost(Number(id));
            return res.status(204).send();
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message });
        }
    }

    async searchPosts(req: Request, res: Response) {
        try {
            const { keyword } = req.query;
            console.log('Search Keyword:', keyword);  // Log do valor de keyword

            if (!keyword || typeof keyword !== 'string' || keyword.trim().length === 0) {
                return res.status(400).json({ message: "Keyword is required" });
            }

            const result = await postService.searchPosts(String(keyword));
            return res.status(200).json(result);
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message });
        }
    }

}

export const postController = new PostController();