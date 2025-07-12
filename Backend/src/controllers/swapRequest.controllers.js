// src/controllers/swapRequest.controllers.js
import { SwapRequest } from '../models/swapRequest.models.js';
import { asyncHandler } from '../utils/async-handler.js';
import { SwapStatusEnum } from '../utils/constants/swapStatusEnum.js';

// Create a swap request
export const createSwapRequest = asyncHandler(async (req, res) => {
  const { fromUser, toUser, skillOffered, skillRequested, message } = req.body;

  const newRequest = new SwapRequest({
    fromUser,
    toUser,
    skillOffered,
    skillRequested,
    message
  });

  await newRequest.save();

  res.status(201).json({
    message: 'Swap request sent successfully',
    request: newRequest
  });
});

// Get all swap requests
export const getAllSwapRequests = asyncHandler(async (req, res) => {
  const requests = await SwapRequest.find()
    .populate('fromUser', 'name email')
    .populate('toUser', 'name email')
    .sort({ createdAt: -1 });

  res.status(200).json(requests);
});

// Get swap requests for a specific user
export const getUserSwapRequests = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const requests = await SwapRequest.find({
    $or: [{ fromUser: userId }, { toUser: userId }]
  })
    .populate('fromUser', 'name email')
    .populate('toUser', 'name email');

  res.status(200).json(requests);
});

// Update the status of a swap request
export const updateSwapRequestStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!Object.values(SwapStatusEnum).includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  const request = await SwapRequest.findById(id);
  if (!request) {
    return res.status(404).json({ message: 'Swap request not found' });
  }

  request.status = status;
  await request.save();

  res.status(200).json({
    message: `Swap request ${status.toLowerCase()} successfully`,
    request
  });
});

// Delete a swap request
export const deleteSwapRequest = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deleted = await SwapRequest.findByIdAndDelete(id);
  if (!deleted) {
    return res.status(404).json({ message: 'Swap request not found' });
  }

  res.status(200).json({ message: 'Swap request deleted successfully' });
});
