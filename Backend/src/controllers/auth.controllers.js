

import {asyncHandler} from '../utils/async-handler.js';
import {User} from '../models/user.model.js';
import {registrationValidation, loginValidation} from '../validations/auth.validation.js';
import {sendVerificationEmail} from '../utils/email.service.js';

const registerUser = asyncHandler(async (req, res) => {
  // Registration logic here
   const {email,name,password,role,location}= req.body;
    // Validate input

    registrationValidation(req.body);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    // Create new user
    const user = new User({
        email,
        name,
        password,
        role,
        location
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });    
}
);

const loginUser = asyncHandler(async (req, res) => {
  // Login logic here
  const { email, password } = req.body; 
  // Validate input
  loginValidation(req.body);
  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
  } 
  // Check password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) { 
      return res.status(400).json({ message: 'Invalid credentials' });
  } 
  // Generate token
  const token = user.generateAuthToken();
  res.status(200).json({ token, user: { id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
    location: user.location
  } });
}
);


const logoutUser = asyncHandler(async (req, res) => {
  // Logout logic here
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.status(200).json({ message: 'Logged out successfully' });
  });
}); 

const verifyEmail = asyncHandler(async (req, res) => {
  // Email verification logic here
  const { token } = req.params;
  const user = await User.findOne({ emailVerificationToken: token });
  if (!user) {
    return res.status(400).json({ message: 'Invalid token' });
  }
  user.emailVerified = true;
  user.emailVerificationToken = undefined;
  await user.save();
  res.status(200).json({ message: 'Email verified successfully' });
});

const resendVerificationEmail = asyncHandler(async (req, res) => {
  // Resend verification email logic here
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }
  // Generate new verification token
  user.emailVerificationToken = user.generateEmailVerificationToken();
  await user.save();
  // Send verification email
  await sendVerificationEmail(user.email, user.emailVerificationToken);
  res.status(200).json({ message: 'Verification email resent successfully' });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  // Refresh access token logic here
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }
  const user = await User.findOne({ refreshToken });
  if (!user) {
    return res.status(400).json({ message: 'Invalid refresh token' });
  }
  // Generate new access token
  const newAccessToken = user.generateAuthToken();
  res.status(200).json({ accessToken: newAccessToken });
});

const forgotPasswordRequest = asyncHandler(async (req, res) => {
  // Forgot password request logic here
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }
  // Generate password reset token
  user.passwordResetToken = user.generatePasswordResetToken();
  await user.save();
  // Send password reset email
  await sendPasswordResetEmail(user.email, user.passwordResetToken);
  res.status(200).json({ message: 'Password reset email sent successfully' });
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  // Change current password logic here
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    return res.status(400).json({ message: 'Current password is incorrect' });
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json({ message: 'Password changed successfully' });
});

const getCurrentUser = asyncHandler(async (req, res) => {
  // Get current user logic here
  const user = await User.findById(req.user.id).select('-password');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(user);
});



export {registerUser, loginUser, logoutUser, verifyEmail, resendVerificationEmail, refreshAccessToken, forgotPasswordRequest, changeCurrentPassword, getCurrentUser };