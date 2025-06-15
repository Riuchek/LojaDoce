import db from '~/server/utils/sqlite';
import { defineEventHandler } from 'h3';

interface Relatorio {
  id: number;
  name: string;
  isPaid: number;
  value: number;
}

export default defineEventHandler(() => {
  const stmt = db.prepare('SELECT id, name, value, isPaid FROM relatorios');
  const relatorios = (stmt.all() as Relatorio[]).map((r) => ({
    id: r.id,
    name: r.name,
    value: r.value,
    isPaid: !!r.isPaid,
  }));
  return relatorios;
}); 