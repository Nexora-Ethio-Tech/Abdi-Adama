import { Router } from 'express';
import { markAttendance, bulkMarkAttendance, getAttendanceBySection, getNotices, getLogisticsNotices, createWeeklyPlan, getWeeklyPlans, getDashboardStats, getWatchlist, getEvents, createEvent, deleteEvent, getInventory, createInventoryItem, updateInventoryItem, deleteInventoryItem, getSchedule, saveSchedule, getGradingConfig, upsertGradingConfig } from '../controllers/operationalController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
const router = Router();
router.use(authenticateToken);
// ─── Dashboard ───────────────────────────────────────────────
router.get('/dashboard/stats', getDashboardStats);
router.get('/dashboard/watchlist', getWatchlist);
// ─── Attendance ──────────────────────────────────────────────
router.post('/attendance', markAttendance);
router.post('/attendance/bulk', bulkMarkAttendance);
router.get('/attendance/section', getAttendanceBySection);
// ─── Weekly Plans ────────────────────────────────────────────
router.post('/weekly-plans', createWeeklyPlan);
router.get('/weekly-plans', getWeeklyPlans);
// ─── Notices ─────────────────────────────────────────────────
router.get('/notices', getNotices);
router.get('/logistics', getLogisticsNotices);
// ─── Events / Notice Board ───────────────────────────────────
router.get('/events', getEvents);
router.post('/events', createEvent);
router.delete('/events/:id', deleteEvent);
// ─── Inventory ───────────────────────────────────────────────
router.get('/inventory', getInventory);
router.post('/inventory', createInventoryItem);
router.put('/inventory/:id', updateInventoryItem);
router.delete('/inventory/:id', deleteInventoryItem);
// ─── Schedules ───────────────────────────────────────────────
router.get('/schedules', getSchedule);
router.post('/schedules', saveSchedule);
// ─── Grading Config ──────────────────────────────────────────
router.get('/grading-config', getGradingConfig);
router.post('/grading-config', upsertGradingConfig);
export default router;
