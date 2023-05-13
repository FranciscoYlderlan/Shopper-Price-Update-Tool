import { AppError } from '../utils/AppError.js';

export function ensureAlertAsyncError(error, request, response, next) {
    const clientError = error instanceof AppError;

    if (clientError) {
        return response.status(error.statusCode).json(error.message());
    }
    console.error(error);

    const serverError = AppError.MessageServerError();

    return response.status(serverError.statusCode).json(serverError);
}
