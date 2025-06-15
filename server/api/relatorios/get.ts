import db from '~/server/utils/sqlite';
import { defineEventHandler, createError } from 'h3';

interface Relatorio {
  id: number;
  name: string;
  isPaid: number;
  value: number;
  order_number: string;
  tel: string;
  address: string;
}

export default defineEventHandler(() => {
  try {
    const stmt = db.prepare('SELECT * FROM relatorios');
    const relatorios = stmt.all() as Relatorio[];
    return relatorios;
  } catch (error) {
    console.error('Error fetching relatorios:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch relatorios'
    });
  }
}); 