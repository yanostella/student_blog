import { Repository } from "typeorm";
import { User } from "../entities/User";
import { IUserRepository } from "./IUserRepository";
import { AppDataSource } from "../../../config/data-source";

export class UserRepository implements IUserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User)
    }

    async getUsers(limit: number, page: number): Promise<User[]> {
        return this.repository.find({
            relations: ['posts'],
            take: limit,
            skip: (page - 1) * limit
        })
    }

    async getUserById(id: number): Promise<User | null> {
        return this.repository.findOne({
            relations: ['posts'],
            where: { id}
        })
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return this.repository.findOne({
            relations: ['posts'],
            where: { email}
        })
    }

    async createUser(user: User): Promise<User> {
        return this.repository.save(user)
    }

    async updateUser(id: number, user: Partial<User>): Promise<User | null> {
        this.repository.update(id, user);
        return this.getUserById(id);
    }

    async deleteUser(id: number): Promise<void> {
        await this.repository.delete(id);
    }

}