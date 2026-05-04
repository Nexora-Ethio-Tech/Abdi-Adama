"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_js_1 = require("../controllers/authController.js");
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
const router = (0, express_1.Router)();
router.post('/register', authController_js_1.register);
router.post('/login', authController_js_1.login);
router.get('/verify', authMiddleware_js_1.authenticateToken, authController_js_1.verify);
// Admin-only routes for approval workflow and provisioning
router.get('/pending-users', authMiddleware_js_1.authenticateToken, (0, authMiddleware_js_1.authorizeRoles)('super-admin', 'school-admin'), authController_js_1.getPendingUsers);
router.patch('/update-status', authMiddleware_js_1.authenticateToken, (0, authMiddleware_js_1.authorizeRoles)('super-admin', 'school-admin'), authController_js_1.updateStatus);
router.post('/provision', authMiddleware_js_1.authenticateToken, (0, authMiddleware_js_1.authorizeRoles)('super-admin', 'school-admin'), authController_js_1.provisionUser);
exports.default = router;
