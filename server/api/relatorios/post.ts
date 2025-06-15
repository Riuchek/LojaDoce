import db from '~/server/utils/sqlite';
import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.name || typeof body.isPaid === 'undefined' || !body.order_number || !body.tel || !body.address) {
    return { error: 'Missing name or isPaid or order_number or tel or address' };
  }
  const stmt = db.prepare('INSERT INTO relatorios (name, value, isPaid, order_number, tel, address) VALUES (?, ?, ?, ?, ?, ?)');
  const info = stmt.run(body.name, body.value, body.isPaid ? 1 : 0, body.order_number, body.tel, body.address);
  return { 
    id: info.lastInsertRowid, 
    name: body.name, 
    isPaid: !!body.isPaid, 
    value: body.value, 
    order_number: body.order_number, 
    tel: body.tel, 
    address: body.address 
  };
}); 