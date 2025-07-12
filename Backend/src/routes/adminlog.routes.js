// src/routes/adminLog.routes.js
import { Router } from 'express';
import {
  createAdminLog,
  getAllAdminLogs,
  getAdminLogById,
  deleteAdminLog
} from '../controllers/adminLog.controllers.js';

const router = Router();

// Routes for admin logs
router.post('/admin-logs', createAdminLog);         // Create log
router.get('/admin-logs', getAllAdminLogs);         // Get all logs
router.get('/admin-logs/:id', getAdminLogById);     // Get single log
router.delete('/admin-logs/:id', deleteAdminLog);   // Delete log

export default router;
