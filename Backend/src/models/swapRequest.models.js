// models/SwapRequest.js
import mongoose from "mongoose";
import { SwapStatusEnum } from "../utils/constants/swapStatusEnum.js";

const swapRequestSchema = new mongoose.Schema(
  {
    // The user who is initiating the swap
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // The user who receives the swap request
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // The skill offered by the requester
    skillOffered: {
      type: String,
      required: true
    },

    // The skill being requested in return
    skillRequested: {
      type: String,
      required: true
    },

    // Status of the request: pending, accepted, rejected, cancelled
    status: {
      type: String,
      enum: Object.values(SwapStatusEnum),
      default: SwapStatusEnum.PENDING
    },

    // Optional message from the requester
    message: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt
  }
);

// Export the SwapRequest model
export const SwapRequest = mongoose.model("SwapRequest", swapRequestSchema);
