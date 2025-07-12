// src/routes/swapRequest.routes.js
import { Router } from 'express';
import {
  createSwapRequest,
  getAllSwapRequests,
  getUserSwapRequests,
  updateSwapRequestStatus,
  deleteSwapRequest
} from '../controllers/swapRequest.controllers.js';

const router = Router();

// Swap Request Routes
router.post('/swap-requests', createSwapRequest);
router.get('/swap-requests', getAllSwapRequests);
router.get('/swap-requests/user/:userId', getUserSwapRequests);
router.patch('/swap-requests/:id/status', updateSwapRequestStatus);
router.delete('/swap-requests/:id', deleteSwapRequest);

export default router;
