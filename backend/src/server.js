import 'express-async-errors';
import { AppError } from './utils/AppError.js';
import express from 'express';
import { routes } from './routes/index.js';

const PORT = 8000;

const app = express();

app.use(routes);

app.use((error, request, response, next) => {
    const clientError = error instanceof AppError;

    if (clientError) {
        return response.status(error.statusCode).json(error.message());
    }
    console.error(error);

    const serverError = AppError.MessageServerError();

    return response.status(serverError.statusCode).json(serverError);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
