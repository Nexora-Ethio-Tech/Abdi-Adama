import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { getGrades, createGrade, getSectionsByGrade, getGradesWithSections, createSection, bulkCreateSections, updateSection, deleteSection, getStudentsBySection, getTeacherSections } from '../controllers/academicController.js';
const router = Router();
// Public route for student registration dropdowns
router.get('/grades/with-sections', getGradesWithSections);
// All other routes require authentication
router.use(authenticateToken);
// Grades
router.get('/grades', getGrades);
router.post('/grades', createGrade);
// Sections
router.get('/grades/:gradeId/sections', getSectionsByGrade);
router.post('/sections', createSection);
router.post('/sections/bulk', bulkCreateSections);
router.put('/sections/:sectionId', updateSection);
router.delete('/sections/:sectionId', deleteSection);
router.get('/teacher/sections', getTeacherSections);
router.get('/sections/:sectionId/students', getStudentsBySection);
export default router;
