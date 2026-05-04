"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBranchById = exports.getBranches = void 0;
const dbClient_js_1 = require("../utils/dbClient.js");
const getBranches = async (req, res) => {
    try {
        const rows = await (0, dbClient_js_1.withRLS)(req, async (client) => {
            const result = await client.query('SELECT * FROM branches ORDER BY name ASC');
            return result.rows;
        });
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch branches' });
    }
};
exports.getBranches = getBranches;
const getBranchById = async (req, res) => {
    const { id } = req.params;
    try {
        const branch = await (0, dbClient_js_1.withRLS)(req, async (client) => {
            const result = await client.query('SELECT * FROM branches WHERE id = $1', [id]);
            return result.rows[0] || null;
        });
        if (!branch) {
            return res.status(404).json({ error: 'Branch not found' });
        }
        res.json(branch);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch branch' });
    }
};
exports.getBranchById = getBranchById;
