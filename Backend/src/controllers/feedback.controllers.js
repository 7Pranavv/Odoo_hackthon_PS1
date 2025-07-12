// src/controllers/feedback.controllers.js
import { Feedback } from '../models/feedback.models.js';
import { asyncHandler } from '../utils/async-handler.js';

// Create feedback
export const createFeedback = asyncHandler(async (req, res) => {
  const { swap, fromUser, toUser, rating, comment } = req.body;

  // Check if feedback already exists for the same swap and user
  const existing = await Feedback.findOne({ swap, fromUser });
  if (existing) {
    return res.status(400).json({ message: 'Feedback already submitted for this swap.' });
  }

  const feedback = new Feedback({
    swap,
    fromUser,
    toUser,
    rating,
    comment
  });

  await feedback.save();

  res.status(201).json({
    message: 'Feedback submitted successfully',
    feedback
  });
});

// Get feedbacks received by a specific user
export const getFeedbacksForUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const feedbacks = await Feedback.find({ toUser: userId })
    .populate('fromUser', 'name email')
    .populate('swap');

  res.status(200).json(feedbacks);
});

// Get all feedbacks (Admin)
export const getAllFeedbacks = asyncHandler(async (req, res) => {
  const all = await Feedback.find()
    .populate('fromUser', 'name')
    .populate('toUser', 'name')
    .populate('swap');

  res.status(200).json(all);
});

// Delete feedback
export const deleteFeedback = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const feedback = await Feedback.findByIdAndDelete(id);
  if (!feedback) {
    return res.status(404).json({ message: 'Feedback not found' });
  }

  res.status(200).json({ message: 'Feedback deleted successfully' });
});
