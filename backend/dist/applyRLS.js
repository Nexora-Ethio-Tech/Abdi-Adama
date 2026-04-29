import pkg from 'pg';
const { Pool } = pkg;
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pool = new Pool({
    user: 'abdiadam_super-admin',
    host: 'localhost',
    database: 'abdiadam_school_db',
    port: 5432,
});
/**
 * Splits SQL into individual statements, respecting:
 * - Dollar-quoted strings ($$...$$)
 * - Single-quoted strings ('...')
 * - Line comments (--)
 * - Block comments (/* ... *\/)
 */
const splitSQL = (sql) => {
    const statements = [];
    let current = '';
    let i = 0;
    let inSingleQuote = false;
    let inLineComment = false;
    let inBlockComment = false;
    let dollarTag = '';
    let inDollarQuote = false;
    while (i < sql.length) {
        const ch = sql[i];
        const next = sql[i + 1];
        // Handle line comment end
        if (inLineComment) {
            if (ch === '\n')
                inLineComment = false;
            current += ch;
            i++;
            continue;
        }
        // Handle block comment end
        if (inBlockComment) {
            if (ch === '*' && next === '/') {
                current += '*/';
                i += 2;
                inBlockComment = false;
                continue;
            }
            current += ch;
            i++;
            continue;
        }
        // Handle dollar-quoted string end
        if (inDollarQuote) {
            if (sql.startsWith(dollarTag, i)) {
                current += dollarTag;
                i += dollarTag.length;
                inDollarQuote = false;
                dollarTag = '';
                continue;
            }
            current += ch;
            i++;
            continue;
        }
        // Handle single-quoted string
        if (inSingleQuote) {
            if (ch === "'" && next === "'") {
                current += "''";
                i += 2;
                continue;
            }
            if (ch === "'")
                inSingleQuote = false;
            current += ch;
            i++;
            continue;
        }
        // Detect start of line comment
        if (ch === '-' && next === '-') {
            inLineComment = true;
            current += '--';
            i += 2;
            continue;
        }
        // Detect start of block comment
        if (ch === '/' && next === '*') {
            inBlockComment = true;
            current += '/*';
            i += 2;
            continue;
        }
        // Detect start of single quote
        if (ch === "'") {
            inSingleQuote = true;
            current += ch;
            i++;
            continue;
        }
        // Detect start of dollar-quote (e.g. $$ or $tag$)
        if (ch === '$') {
            const match = sql.slice(i).match(/^(\$[^$]*\$)/);
            if (match) {
                dollarTag = match[1];
                inDollarQuote = true;
                current += dollarTag;
                i += dollarTag.length;
                continue;
            }
        }
        // Statement separator
        if (ch === ';') {
            const stmt = current.trim();
            if (stmt.length > 0) {
                statements.push(stmt);
            }
            current = '';
            i++;
            continue;
        }
        current += ch;
        i++;
    }
    // Last statement without trailing semicolon
    const last = current.trim();
    if (last.length > 0)
        statements.push(last);
    return statements;
};
const runFile = async (filePath, label) => {
    const sql = fs.readFileSync(filePath, 'utf-8');
    const statements = splitSQL(sql);
    let success = 0, skipped = 0, errors = 0;
    for (const stmt of statements) {
        // Skip empty or comment-only statements
        if (!stmt || /^(--.*)$/.test(stmt))
            continue;
        try {
            await pool.query(stmt);
            success++;
        }
        catch (err) {
            // Skip "already exists" type errors
            if (['42710', '42P07', '42P17', '23505', '42701'].includes(err.code)) {
                skipped++;
            }
            else {
                errors++;
                console.error(`  ❌ [${err.code}] ${err.message.substring(0, 120)}`);
                console.error(`     SQL: ${stmt.substring(0, 80)}...`);
            }
        }
    }
    console.log(`  ${label}: ${success} ok, ${skipped} skipped, ${errors} errors`);
    return errors;
};
const main = async () => {
    const schemaPath = path.resolve(__dirname, '../../database/schema.sql');
    const rlsPath = path.resolve(__dirname, '../../database/rls_policies.sql');
    console.log('\n📦 Applying schema...');
    const schemaErrors = await runFile(schemaPath, 'Schema');
    console.log('\n🔒 Applying RLS policies...');
    const rlsErrors = await runFile(rlsPath, 'RLS');
    if (schemaErrors === 0 && rlsErrors === 0) {
        console.log('\n✅ All done! Database is fully set up.\n');
    }
    else {
        console.log(`\n⚠️  Completed with ${schemaErrors + rlsErrors} errors. Check above.\n`);
    }
    await pool.end();
};
main().catch(async (err) => {
    console.error('Fatal:', err.message);
    await pool.end();
});
