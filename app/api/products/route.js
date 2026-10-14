import db from '@/lib/db';export const runtime='nodejs';export async function GET(){return Response.json(db.prepare('SELECT * FROM products WHERE active=1').all())}
