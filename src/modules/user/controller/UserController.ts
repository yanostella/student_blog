import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/UserService";
import { User } from "../entities/User";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export class UserController {
    async getUsers(req: Request, res: Response) {
        try {
            const { limit, page } = req.query;
            const users = await userService.getUsers(Number(limit), Number(page));
            return res.status(200).json(users);
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message });
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(Number(id));
            return res.status(200).json(user);
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message });
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const user: User = req.body;
            const newUser = await userService.createUser(user);
            return res.status(201).json(newUser);
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user: Partial<User> = req.body;
            const updatedUser = await userService.updateUser(Number(id), user);
            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await userService.deleteUser(Number(id));
            return res.status(204).send();
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
}

export const userController = new UserController();