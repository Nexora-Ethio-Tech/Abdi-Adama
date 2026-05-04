"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManifest = exports.assignStudent = exports.getRoutes = void 0;
const dbClient_js_1 = require("../utils/dbClient.js");
const getRoutes = async (req, res) => {
    try {
        const routes = await (0, dbClient_js_1.withRLS)(req, async (client) => {
            const result = await client.query(`
        SELECT r.*, v.plate_number, v.model, v.capacity, u.name as driver_name,
               (SELECT COUNT(*) FROM student_routes sr WHERE sr.route_id = r.id) as current_occupancy
        FROM routes r
        LEFT JOIN vehicles v ON r.vehicle_id = v.id
        LEFT JOIN users u ON r.driver_id = u.id
      `);
            return result.rows;
        });
        res.json(routes);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch routes' });
    }
};
exports.getRoutes = getRoutes;
const assignStudent = async (req, res) => {
    const { student_id, route_id } = req.body;
    try {
        await (0, dbClient_js_1.withRLS)(req, async (client) => {
            // 1. Check capacity
            const routeRes = await client.query(`
        SELECT v.capacity, (SELECT COUNT(*) FROM student_routes sr WHERE sr.route_id = $1) as current_occupancy
        FROM routes r
        JOIN vehicles v ON r.vehicle_id = v.id
        WHERE r.id = $1
      `, [route_id]);
            if (routeRes.rows.length === 0)
                throw new Error('Route not found');
            const { capacity, current_occupancy } = routeRes.rows[0];
            if (current_occupancy >= capacity) {
                throw new Error('Vehicle capacity reached');
            }
            // 2. Assign student
            await client.query('INSERT INTO student_routes (student_id, route_id) VALUES ($1, $2) ON CONFLICT DO NOTHING', [student_id, route_id]);
        });
        res.json({ message: 'Student assigned to route successfully' });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message || 'Failed to assign student' });
    }
};
exports.assignStudent = assignStudent;
const getManifest = async (req, res) => {
    const driver_id = req.user.id;
    try {
        const manifest = await (0, dbClient_js_1.withRLS)(req, async (client) => {
            const result = await client.query(`
        SELECT u.name as student_name, u.digital_id, s.grade, r.name as route_name
        FROM student_routes sr
        JOIN students s ON sr.student_id = s.id
        JOIN users u ON s.user_id = u.id
        JOIN routes r ON sr.route_id = r.id
        WHERE r.driver_id = $1
      `, [driver_id]);
            return result.rows;
        });
        res.json(manifest);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch manifest' });
    }
};
exports.getManifest = getManifest;
