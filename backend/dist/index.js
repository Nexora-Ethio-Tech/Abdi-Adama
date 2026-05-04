import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js';
import branchRoutes from './routes/branchRoutes.js';
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';
import financeRoutes from './routes/financeRoutes.js';
import examRoutes from './routes/examRoutes.js';
import operationalRoutes from './routes/operationalRoutes.js';
import libraryRoutes from './routes/libraryRoutes.js';
import clinicRoutes from './routes/clinicRoutes.js';
import transportRoutes from './routes/transportRoutes.js';
import academicRoutes from './routes/academicRoutes.js';
import admissionsRoutes from './routes/admissionsRoutes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const isProd = process.env.NODE_ENV === 'production';
// ─── Trust LiteSpeed reverse proxy ───────────────────────────────────────────
// Required so req.protocol reports "https" behind the proxy
if (isProd) {
    app.set('trust proxy', 1);
}
// ─── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = [
    'http://localhost:5173', // local dev
    'https://abdi-adama.com', // production
    'https://www.abdi-adama.com', // production www
    process.env.FRONTEND_URL, // from .env
].filter(Boolean);
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error(`CORS blocked: ${origin}`));
        }
    },
    credentials: true,
}));
// ─── Security headers ────────────────────────────────────────────────────────
app.use((_req, res, next) => {
    if (isProd) {
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    }
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});
app.use(express.json());
// ─── Health check ─────────────────────────────────────────────────────────────
// LiteSpeed proxies  https://abdi-adama.com/api  →  Node (root '/')
app.get('/', (_req, res) => {
    res.json({ status: 'ok', message: 'Abdi Adama School API is running!' });
});
// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/branches', branchRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/ops', operationalRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/clinic', clinicRoutes);
app.use('/api/transport', transportRoutes);
app.use('/api/academic', academicRoutes);
app.use('/api/admissions', admissionsRoutes);
// ─── DB test ──────────────────────────────────────────────────────────────────
app.get('/api/test-db', async (_req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ status: 'Connected', time: result.rows[0].now });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database connection failed' });
    }
});
// ─── 404 catch-all ────────────────────────────────────────────────────────────
app.use((_req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} [${isProd ? 'PRODUCTION' : 'DEV'}]`);
});
