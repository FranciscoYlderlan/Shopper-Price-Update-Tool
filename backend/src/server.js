import 'express-async-errors';
import express from 'express';
import { routes } from './routes/index.js';
import { ensureAlertAsyncError } from './middleware/ensureAlertAsyncError.js';

const PORT = 8000;

const app = express();

app.use(routes);

app.use(ensureAlertAsyncError);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
