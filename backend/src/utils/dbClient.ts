import { Request } from 'express';
import pool from '../config/db.js';
import { PoolClient } from 'pg';

/**
 * Executes a database query within a transaction that sets the PostgreSQL
 * current_setting configuration variables for Row Level Security (RLS).
 */
export const withRLS = async <T>(req: Request, callback: (client: PoolClient) => Promise<T>): Promise<T> => {
  const user = (req as any).user;
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // If we have an authenticated user, set the local session variables for RLS
    if (user) {
      await client.query('SELECT set_config(\'app.current_user_id\', $1, true)', [user.id || '']);
      await client.query('SELECT set_config(\'app.user_role\', $1, true)', [user.role || '']);
      await client.query('SELECT set_config(\'app.current_branch_id\', $1, true)', [user.branch_id || '']);
    } else {
      // For public/unauthenticated routes
      await client.query('SELECT set_config(\'app.user_role\', \'anon\', true)');
    }

    const result = await callback(client);
    
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};
