import Database from 'better-sqlite3';
import { join } from 'path';
import { createError } from 'h3';

const dbPath = join(process.cwd(), 'relatorios.db');

let db: Database.Database;

try {
  db = new Database(dbPath);
  
  // Ensure the relatorios table exists
  // id: integer primary key, name: text, isPaid: boolean (0/1)
  db.exec(`
    CREATE TABLE IF NOT EXISTS relatorios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      value INTEGER NOT NULL,
      isPaid INTEGER NOT NULL,
      order_number TEXT NOT NULL,
      tel TEXT NOT NULL,
      address TEXT NOT NULL
    )
  `);
} catch (error) {
  console.error('Failed to initialize database:', error);
  throw createError({
    statusCode: 500,
    message: 'Failed to initialize database'
  });
}

export default db;
