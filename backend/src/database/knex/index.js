import sqlite3 from 'sqlite3';
import * as sqlite from 'sqlite';
import Path from '../../utils/Path.js';
import path from 'path';

export async function sqliteConnection() {
    const database = await sqlite.open({
        filename: path.resolve(Path.dirname(import.meta.url), '..', 'database.db'),
        driver: sqlite3.Database,
    });
    return database;
}
