// models/User.js
import mongoose from "mongoose";
import { UserRolesEnum } from "../utils/constants.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    // Basic user info
    name: { 
      type: String, 
      required: true,
      trim: true  // Ensures no leading/trailing spaces
     },
      password: { 
      type: String, 
      required: true ,
    }, // Store as hashed value
    location: { 
      type: String
     },
    profilePhoto: 
    { 
      type:{ 
      url: String,
      localpath: String
    }, // Optional profile image URL
    default: {
      url: "https://your-website.com/i/width-320/height-240",
      localpath: "/images/default-profile.png"
    },
    },
    email: {
      type: String, 
      unique: true,
      required: true
      },
    isEmailVerified: {
      type: Boolean,
      default: false
      }, // For email verification status
    forgotPasswordToken: { 
      type: String
    }, // For password reset functionality
    forgotPasswordExpiry: {
      type: Date
    }, // Expiry for the password reset token
    refreshToken: { 
      type: String
    },
    emailVerificationToken: { 
      type: String
    }, // For email verification
    emailVerificationExpiry: {
      type: Date
    }, // Expiry for the email verification token
    // Skill-based fields
    skillsOffered: [{ type: String }],
    skillsWanted: [{ type: String }],
    availability: [{ type: String }], // Example: ['Weekends', 'Evenings']

    // Profile visibility
    isPublic: { type: Boolean, default: true },

    // Role-based access (user, admin)
    role: {
      type: String,
      enum: Object.values(UserRolesEnum),
      default: UserRolesEnum.USER
    },

    // Admin control fields
    isBanned: { type: Boolean, default: false },       // Used to ban/unban users
    isDeleted: { type: Boolean, default: false },      // Used for soft deletes

    // User blocking functionality
    blockedUsers: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    ]
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt
  }
);

userSchema.pre("save", async function (next) {
  // Add any pre-save logic here, such as password hashing
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10); // Hash the password before saving
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  // Method to check if the provided password matches the hashed password
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  // Method to generate an access token for the user
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      name: this.name,
      role: this.role
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_TOKEN_EXPIRY || "1d" } // Default to 1 day if not set
  );
};  

userSchema.methods.generateRefreshToken = function () {
  // Method to generate a refresh token for the user
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY || "1d" } // Default to 1 day if not set
  );
};

userSchema.methods.generateTemporaryToken = function () {
  const unhashedToken = crypto.randomBytes(32).toString("hex"); // Generate a random token for password reset or email verification
  
  const hashedToken = crypto
    .createHash("sha256")
    .update(unhashedToken)
    .digest("hex"); // Hash the token for storage

    const tokenExpiry = Date.now() + 30 * 60 * 1000; // Set expiry for 30 minutes from now
  return {
    unhashedToken, // Return the unhashed token for sending via email
    hashedToken,
    tokenExpiry
  };
};

// Export the User model
export const User = mongoose.model("User", userSchema);