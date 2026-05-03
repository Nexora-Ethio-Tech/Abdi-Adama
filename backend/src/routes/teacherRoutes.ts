import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import {
    getTeachers,
    createTeacher,
    getTeacherById,
    assignRoomTeacher,
    removeRoomTeacher,
    assignExaminer,
    removeExamAssignment,
    assignDepartmentHead,
    removeDepartmentHead,
    updateTeacherSchedule
} from '../controllers/teacherController.js';

const router = Router();

router.use(authenticateToken);

router.get('/', getTeachers);
router.post('/', createTeacher);
router.get('/:id', getTeacherById);

// Room teacher assignments
router.post('/:teacherId/assign-room', assignRoomTeacher);
router.delete('/:teacherId/remove-room', removeRoomTeacher);

// Examiner assignments
router.post('/:teacherId/assign-examiner', assignExaminer);
router.delete('/exam-assignments/:assignmentId', removeExamAssignment);

// Department head assignments
router.post('/:teacherId/assign-department-head', assignDepartmentHead);
router.delete('/department-heads/:assignmentId', removeDepartmentHead);

// Schedule management
router.put('/:teacherId/schedule', updateTeacherSchedule);

export default router;
