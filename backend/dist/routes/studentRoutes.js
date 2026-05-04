"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentController_js_1 = require("../controllers/studentController.js");
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
const router = (0, express_1.Router)();
// All student routes require authentication
router.use(authMiddleware_js_1.authenticateToken);
// Restrict access to specific roles (excluding teachers as requested)
router.get('/', (0, authMiddleware_js_1.authorizeRoles)('super-admin', 'school-admin', 'vice-principal', 'finance-clerk'), studentController_js_1.getStudents);
router.get('/:id', (0, authMiddleware_js_1.authorizeRoles)('super-admin', 'school-admin', 'vice-principal', 'finance-clerk'), studentController_js_1.getStudentById);
router.post('/', (0, authMiddleware_js_1.authorizeRoles)('super-admin', 'school-admin'), studentController_js_1.createStudent);
router.get('/special/list', (0, authMiddleware_js_1.authorizeRoles)('super-admin', 'school-admin', 'finance-clerk', 'auditor'), studentController_js_1.getSpecialStudents);
router.put('/fees/update', (0, authMiddleware_js_1.authorizeRoles)('super-admin', 'school-admin', 'finance-clerk'), studentController_js_1.updateStudentFees);
router.post('/fees/approve', (0, authMiddleware_js_1.authorizeRoles)('super-admin', 'auditor', 'finance-clerk'), studentController_js_1.approveFeeReduction);
exports.default = router;
