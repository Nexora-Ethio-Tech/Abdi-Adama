"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
const teacherController_js_1 = require("../controllers/teacherController.js");
const router = (0, express_1.Router)();
router.use(authMiddleware_js_1.authenticateToken);
router.get('/', teacherController_js_1.getTeachers);
router.post('/', teacherController_js_1.createTeacher);
router.get('/:id', teacherController_js_1.getTeacherById);
// Room teacher assignments
router.post('/:teacherId/assign-room', teacherController_js_1.assignRoomTeacher);
router.delete('/:teacherId/remove-room', teacherController_js_1.removeRoomTeacher);
// Examiner assignments
router.post('/:teacherId/assign-examiner', teacherController_js_1.assignExaminer);
router.delete('/exam-assignments/:assignmentId', teacherController_js_1.removeExamAssignment);
// Department head assignments
router.post('/:teacherId/assign-department-head', teacherController_js_1.assignDepartmentHead);
router.delete('/department-heads/:assignmentId', teacherController_js_1.removeDepartmentHead);
// Schedule management
router.put('/:teacherId/schedule', teacherController_js_1.updateTeacherSchedule);
exports.default = router;
