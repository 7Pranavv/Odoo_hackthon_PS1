// models/Feedback.js
import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    // Reference to the related swap
    swap: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SwapRequest",
      required: true
    },

    // Who is giving the feedback
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Who is receiving the feedback
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Numeric rating (e.g., 1–5 stars)
    rating: {
      type: Number,
      min: 0,
      max: 5,
      required: true
    },

    // Optional text comment
    comment: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt
  }
);

// Export the Feedback model
export const Feedback = mongoose.model("Feedback", feedbackSchema);
