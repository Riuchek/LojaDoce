import db from '~/server/utils/sqlite';
import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.name || typeof body.isPaid === 'undefined') {
    return { error: 'Missing name or isPaid' };
  }
  const stmt = db.prepare('INSERT INTO relatorios (name, value, isPaid) VALUES (?, ?, ?)');
  const info = stmt.run(body.name, body.value, body.isPaid ? 1 : 0);
  return { id: info.lastInsertRowid, name: body.name, isPaid: !!body.isPaid, value: body.value };
}); 