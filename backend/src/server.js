import 'express-async-errors';
import express from 'express';
import { routes } from './routes/index.js';
import { ensureAlertAsyncErrors } from './middleware/ensureAlertAsyncError.js';
import { sqliteConnection } from './database/sqlite/index.js';

const PORT = 8000;

const app = express();

app.use(routes);
app.use(ensureAlertAsyncErrors);

sqliteConnection();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
