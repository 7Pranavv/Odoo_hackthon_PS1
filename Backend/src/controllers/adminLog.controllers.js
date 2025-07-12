// src/controllers/adminLog.controllers.js
import { AdminLog } from '../models/AdminLog.models.js';
import { asyncHandler } from '../utils/async-handler.js';

// Create a new admin log
export const createAdminLog = asyncHandler(async (req, res) => {
  const { adminUser, actionType, targetUser, message } = req.body;

  const log = new AdminLog({ adminUser, actionType, targetUser, message });
  await log.save();

  res.status(201).json({
    message: 'Admin log created successfully',
    log
  });
});

// Get all admin logs
export const getAllAdminLogs = asyncHandler(async (req, res) => {
  const logs = await AdminLog.find()
    .populate('adminUser', 'name email')
    .populate('targetUser', 'name email')
    .sort({ createdAt: -1 });

  res.status(200).json(logs);
});

// Get a single log by ID
export const getAdminLogById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const log = await AdminLog.findById(id)
    .populate('adminUser', 'name email')
    .populate('targetUser', 'name email');

  if (!log) {
    return res.status(404).json({ message: 'Admin log not found' });
  }

  res.status(200).json(log);
});

// Delete a log by ID
export const deleteAdminLog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedLog = await AdminLog.findByIdAndDelete(id);

  if (!deletedLog) {
    return res.status(404).json({ message: 'Log not found' });
  }

  res.status(200).json({ message: 'Admin log deleted successfully' });
});
