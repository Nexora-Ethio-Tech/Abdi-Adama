"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({ error: 'Access denied, token missing' });
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, user) => {
        if (err)
            return res.status(403).json({ error: 'Invalid or expired token' });
        req.user = user;
        // Strict route guarding: block students from admin or teacher routes globally
        if (user.role === 'student') {
            if (req.originalUrl.startsWith('/api/admin') || req.originalUrl.startsWith('/api/teacher') || req.originalUrl.startsWith('/api/teachers')) {
                return res.status(403).json({ error: 'Students cannot access admin or teacher routes' });
            }
        }
        next();
    });
};
exports.authenticateToken = authenticateToken;
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Unauthorized role' });
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
