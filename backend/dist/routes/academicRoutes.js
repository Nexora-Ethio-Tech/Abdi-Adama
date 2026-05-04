"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
const academicController_js_1 = require("../controllers/academicController.js");
const router = (0, express_1.Router)();
// All routes require authentication
router.use(authMiddleware_js_1.authenticateToken);
// Grades
router.get('/grades', academicController_js_1.getGrades);
router.post('/grades', academicController_js_1.createGrade);
router.get('/grades/with-sections', academicController_js_1.getGradesWithSections);
// Sections
router.get('/grades/:gradeId/sections', academicController_js_1.getSectionsByGrade);
router.post('/sections', academicController_js_1.createSection);
router.post('/sections/bulk', academicController_js_1.bulkCreateSections);
router.put('/sections/:sectionId', academicController_js_1.updateSection);
router.delete('/sections/:sectionId', academicController_js_1.deleteSection);
router.get('/sections/:sectionId/students', academicController_js_1.getStudentsBySection);
exports.default = router;
