import db from '~/server/utils/sqlite';
import { defineEventHandler, getRouterParam, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  if (!id) {
    return { error: 'Missing id' };
  }

  const body = await readBody(event);
  if (typeof body.isPaid !== 'boolean') {
    return { error: 'Missing isPaid status' };
  }

  const stmt = db.prepare('UPDATE relatorios SET isPaid = ? WHERE id = ?');
  const info = stmt.run(body.isPaid ? 1 : 0, id);
  
  if (info.changes === 0) {
    return { error: 'Relatório not found' };
  }

  return { success: true };
}); 