import Database from 'better-sqlite3';
import { join } from 'path';

const dbPath = join(process.cwd(), 'relatorios.db');

const db = new Database(dbPath);

// Ensure the relatorios table exists
// id: integer primary key, name: text, isPaid: boolean (0/1)
db.exec(`
  CREATE TABLE IF NOT EXISTS relatorios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    value INTEGER NOT NULL,
    isPaid INTEGER NOT NULL
  )
`);

export default db;
