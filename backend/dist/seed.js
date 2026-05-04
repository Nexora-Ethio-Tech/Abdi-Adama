import bcrypt from 'bcrypt';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
});
const seedSuperAdmin = async () => {
    const name = 'Super Admin';
    const email = 'abdiadamaschooloffice@gmail.com';
    const password = 'ChangeMe123!'; // Change after first login
    const role = 'super-admin';
    const status = 'Approved';
    try {
        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length === 0) {
            const hashedPassword = await bcrypt.hash(password, 10);
            await pool.query('INSERT INTO users (name, email, password_hash, role, status) VALUES ($1, $2, $3, $4, $5)', [name, email, hashedPassword, role, status]);
            console.log('✅ Super Admin seeded. Email:', email, '| Password: ChangeMe123!');
        }
        else {
            console.log('✅ Super Admin already exists.');
        }
    }
    catch (err) {
        console.error('❌ Error seeding Super Admin:', err);
    }
    finally {
        await pool.end();
    }
};
seedSuperAdmin();
