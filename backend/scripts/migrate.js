import dotenv from 'dotenv';
import pg from 'pg';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

async function runMigration() {
  try {
    console.log('Connecting to database...');
    await pool.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS username VARCHAR(50) UNIQUE;');
    console.log('Successfully added username column to users table.');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await pool.end();
  }
}

runMigration();
