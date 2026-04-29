import pkg from 'pg';
const { Pool } = pkg;

// Connect as postgres superuser (trust mode - no password needed right now)
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  port: 5432,
});

const TARGET_USER = 'abdiadam_super-admin';
const TARGET_PASS = 'AbdiAdama@Server@';
const TARGET_DB   = 'abdiadam_school_db';

const run = async () => {
  try {
    // 1. Create or update user
    const userCheck = await pool.query(
      `SELECT usename FROM pg_user WHERE usename = $1`, [TARGET_USER]
    );
    if (userCheck.rows.length === 0) {
      await pool.query(`CREATE USER "${TARGET_USER}" WITH SUPERUSER PASSWORD '${TARGET_PASS}'`);
      console.log('✅ User created:', TARGET_USER);
    } else {
      await pool.query(`ALTER USER "${TARGET_USER}" WITH SUPERUSER PASSWORD '${TARGET_PASS}'`);
      console.log('✅ User password set:', TARGET_USER);
    }

    // 2. Create database if needed
    const dbCheck = await pool.query(
      `SELECT datname FROM pg_database WHERE datname = $1`, [TARGET_DB]
    );
    if (dbCheck.rows.length === 0) {
      await pool.query(`CREATE DATABASE "${TARGET_DB}" OWNER "${TARGET_USER}"`);
      console.log('✅ Database created:', TARGET_DB);
    } else {
      await pool.query(`GRANT ALL PRIVILEGES ON DATABASE "${TARGET_DB}" TO "${TARGET_USER}"`);
      console.log('✅ Database exists, privileges granted');
    }

    console.log('\n✅ Setup complete! Now applying schema and RLS...\n');
  } catch (err: any) {
    console.error('❌ Setup error:', err.message);
  } finally {
    await pool.end();
  }
};

run();
