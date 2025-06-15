import db from '~/server/utils/sqlite';
import { defineEventHandler, getRouterParam } from 'h3';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  if (!id) {
    return { error: 'Missing id' };
  }
  const stmt = db.prepare('DELETE FROM relatorios WHERE id = ?');
  const info = stmt.run(id);
  return { changes: info.changes };
}); 