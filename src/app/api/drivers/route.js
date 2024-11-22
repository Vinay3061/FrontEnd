import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM drivers');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching drivers:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}