"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const pg_1 = __importDefault(require("pg"));
const { Pool } = pg_1.default;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
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
