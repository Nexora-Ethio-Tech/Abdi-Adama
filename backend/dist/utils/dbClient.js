"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withRLS = void 0;
const db_js_1 = __importDefault(require("../config/db.js"));
/**
 * Executes a database query within a transaction that sets the PostgreSQL
 * current_setting configuration variables for Row Level Security (RLS).
 */
const withRLS = async (req, callback) => {
    const user = req.user;
    const client = await db_js_1.default.connect();
    try {
        await client.query('BEGIN');
        // If we have an authenticated user, set the local session variables for RLS
        if (user) {
            await client.query(`SET LOCAL app.current_user_id = '${user.id}'`);
            await client.query(`SET LOCAL app.current_role = '${user.role}'`);
            await client.query(`SET LOCAL app.current_branch_id = '${user.branch_id || ''}'`);
        }
        else {
            // For public/unauthenticated routes
            await client.query(`SET LOCAL app.current_role = 'anon'`);
        }
        const result = await callback(client);
        await client.query('COMMIT');
        return result;
    }
    catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }
    finally {
        client.release();
    }
};
exports.withRLS = withRLS;
