import pkg from 'pg';
const { Pool } = pkg;
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'abdi_adama',
  password: process.env.DB_PASSWORD || 'postgres',
  port: parseInt(process.env.DB_PORT || '5432'),
});

async function setupAdmin() {
  const email = 'abdiadamaschooloffice@gmail.com';
  const password = 'ChangeMe123!';
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      console.log('User already exists. Updating password...');
      await pool.query('UPDATE users SET password_hash = $1, status = \'Approved\', role = \'super-admin\' WHERE email = $2', [hashedPassword, email]);
    } else {
      console.log('Creating new Super Admin...');
      await pool.query(
        'INSERT INTO users (name, email, password_hash, role, status) VALUES ($1, $2, $3, $4, $5)',
        ['Abdi Adama Admin', email, hashedPassword, 'super-admin', 'Approved']
      );
    }
    console.log('Super Admin is ready.');
  } catch (err) {
    console.error('Error setting up admin:', err);
  } finally {
    await pool.end();
  }
}

setupAdmin();
