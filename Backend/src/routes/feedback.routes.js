// src/routes/feedback.routes.js
import { Router } from 'express';
import {
  createFeedback,
  getFeedbacksForUser,
  getAllFeedbacks,
  deleteFeedback
} from '../controllers/feedback.controllers.js';

const router = Router();

// Feedback Routes
router.post('/feedbacks', createFeedback);
router.get('/feedbacks/user/:userId', getFeedbacksForUser);
router.get('/feedbacks', getAllFeedbacks); // Admin use
router.delete('/feedbacks/:id', deleteFeedback);

export default router;
