"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
const admissionsController_js_1 = require("../controllers/admissionsController.js");
const router = (0, express_1.Router)();
// Public endpoint - no auth required
router.post('/apply', admissionsController_js_1.submitApplication);
// All other routes require authentication
router.use(authMiddleware_js_1.authenticateToken);
// Registration config
router.get('/config', admissionsController_js_1.getRegistrationConfig);
router.post('/config/toggle', admissionsController_js_1.toggleRegistration);
// Applications
router.get('/applications', admissionsController_js_1.getApplications);
router.post('/applications/:applicationId/review', admissionsController_js_1.reviewApplication);
router.post('/applications/:applicationId/exam-passed', admissionsController_js_1.markExamPassed);
router.post('/applications/:applicationId/confirm-payment', admissionsController_js_1.confirmPayment);
router.post('/applications/:applicationId/finalize', admissionsController_js_1.finalizeEnrollment);
// Bulk communication
router.post('/bulk-notification', admissionsController_js_1.bulkSendExamNotification);
exports.default = router;
