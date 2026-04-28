import bcrypt from 'bcrypt';
import pool from './config/db.js';

const seedSuperAdmin = async () => {
  const name = 'Super Admin';
  const email = 'abdiadamaschooloffice@gmail.com';
  const password = 'ChangeMe123!'; // User should change this after first login
  const role = 'super-admin';
  const status = 'Approved';

  try {
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    if (existingUser.rows.length === 0) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query(
        'INSERT INTO users (name, email, password_hash, role, status) VALUES ($1, $2, $3, $4, $5)',
        [name, email, hashedPassword, role, status]
      );
      console.log('Super Admin seeded successfully.');
    } else {
      console.log('Super Admin already exists.');
    }
  } catch (err) {
    console.error('Error seeding Super Admin:', err);
  } finally {
    process.exit();
  }
};

seedSuperAdmin();
