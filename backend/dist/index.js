"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_js_1 = __importDefault(require("./config/db.js"));
const branchRoutes_js_1 = __importDefault(require("./routes/branchRoutes.js"));
const authRoutes_js_1 = __importDefault(require("./routes/authRoutes.js"));
const studentRoutes_js_1 = __importDefault(require("./routes/studentRoutes.js"));
const teacherRoutes_js_1 = __importDefault(require("./routes/teacherRoutes.js"));
const financeRoutes_js_1 = __importDefault(require("./routes/financeRoutes.js"));
const examRoutes_js_1 = __importDefault(require("./routes/examRoutes.js"));
const operationalRoutes_js_1 = __importDefault(require("./routes/operationalRoutes.js"));
const libraryRoutes_js_1 = __importDefault(require("./routes/libraryRoutes.js"));
const clinicRoutes_js_1 = __importDefault(require("./routes/clinicRoutes.js"));
const transportRoutes_js_1 = __importDefault(require("./routes/transportRoutes.js"));
const academicRoutes_js_1 = __importDefault(require("./routes/academicRoutes.js"));
const admissionsRoutes_js_1 = __importDefault(require("./routes/admissionsRoutes.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
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
app.use((0, cors_1.default)({
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
app.use(express_1.default.json());
// ─── Health check ─────────────────────────────────────────────────────────────
// LiteSpeed proxies  https://abdi-adama.com/api  →  Node (root '/')
app.get('/', (_req, res) => {
    res.json({ status: 'ok', message: 'Abdi Adama School API is running!' });
});
// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/branches', branchRoutes_js_1.default);
app.use('/api/auth', authRoutes_js_1.default);
app.use('/api/students', studentRoutes_js_1.default);
app.use('/api/teachers', teacherRoutes_js_1.default);
app.use('/api/finance', financeRoutes_js_1.default);
app.use('/api/exams', examRoutes_js_1.default);
app.use('/api/ops', operationalRoutes_js_1.default);
app.use('/api/library', libraryRoutes_js_1.default);
app.use('/api/clinic', clinicRoutes_js_1.default);
app.use('/api/transport', transportRoutes_js_1.default);
app.use('/api/academic', academicRoutes_js_1.default);
app.use('/api/admissions', admissionsRoutes_js_1.default);
// ─── DB test ──────────────────────────────────────────────────────────────────
app.get('/api/test-db', async (_req, res) => {
    try {
        const result = await db_js_1.default.query('SELECT NOW()');
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
