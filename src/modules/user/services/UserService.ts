import { User } from './../entities/User';
import { IUserRepository } from 'modules/user/repositories/IUserRepository';
import { NotFoundError } from 'shared/error/NotFoundError';
import { AppError } from 'shared/error/AppError';
export class UserService {
    constructor(
        private userRepository: IUserRepository
    ) {}

    async getUsers(limit: number, page: number) {
        return this.userRepository.getUsers(limit, page);
    }

    async getUserById(id: number) {
        const user = await this.userRepository.getUserById(id);
        if (!user) {
            throw new NotFoundError('User with this id');
        }
        return user;
    }

    async getUserByEmail(email: string) {
        return this.userRepository.getUserByEmail(email);
    }

    async createUser(user: User) {
        const userExists = await this.getUserByEmail(user.email);
        if (userExists) {
            throw new AppError('User with this email already exists', 400);  
        }
       return this.userRepository.createUser(user);

    }

    async updateUser(id: number, user: Partial<User>) {
        await this.getUserById(id);
        const allowedFields: Partial<User> = {
            name: user.name,
            password: user.password,
        };   
        return this.userRepository.updateUser(id, allowedFields);
    }

    async deleteUser(id: number) {
        await this.getUserById(id);
        return this.userRepository.deleteUser(id);
    }
}