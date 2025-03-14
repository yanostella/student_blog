import { AppError } from "./AppError";

export class UnauthorizedError extends AppError {

    constructor() {
        super('Unathorized', 403);
    }
}