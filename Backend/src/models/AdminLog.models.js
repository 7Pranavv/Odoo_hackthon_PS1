// models/AdminLog.js
import mongoose from "mongoose";

const adminLogSchema = new mongoose.Schema(
  {
    // Admin who performed the action
    adminUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Type of action taken by admin
    actionType: {
      type: String,
      enum: ['BAN_USER', 'UNBAN_USER', 'REJECT_SKILL', 'DELETE_USER', 'ANNOUNCEMENT'],
      required: true
    },

    // The user affected by the action (if applicable)
    targetUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    // Optional message or description
    message: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true // Automatically includes createdAt and updatedAt
  }
);

// Export the AdminLog model
export const AdminLog = mongoose.model("AdminLog", adminLogSchema);
