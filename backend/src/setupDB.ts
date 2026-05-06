import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Connect using cPanel environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

const run = async () => {
  try {
    console.log('🚀 Starting Database Setup for cPanel...');

    // In cPanel, the user and database are already created via the UI.
    // We just need to ensure the schema is applied.
    
    // Look for the schema file
    const schemaPath = path.resolve(__dirname, '../../database/schema.sql');
    if (!fs.existsSync(schemaPath)) {
      console.error('❌ Schema file not found at:', schemaPath);
      return;
    }

    const sql = fs.readFileSync(schemaPath, 'utf-8');
    
    // Simple split by semicolon (caution: doesn't handle complex triggers/functions perfectly,
    // but works for standard CREATE TABLE statements)
    const statements = sql.split(';').map(s => s.trim()).filter(s => s.length > 0);

    for (const statement of statements) {
      try {
        await pool.query(statement);
      } catch (err: any) {
        // Ignore "already exists" errors
        if (!err.message.includes('already exists')) {
          console.warn(`⚠️  Warning during statement execution: ${err.message}`);
        }
      }
    }

    console.log('✅ Database tables setup successful!');

  } catch (err: any) {
    console.error('❌ Setup error:', err.message);
  } finally {
    await pool.end();
  }
};

run();
