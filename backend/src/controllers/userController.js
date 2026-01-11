import User from "../models/userModel.js";
import { sendVerificationEmail } from '../utils/sendEmail.js';
import generateToken from "../utils/utils.js"
import Verification from "../models/verificationModel.js"

// REGISTER
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try{
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Generate 4-digit Code
  const code = Math.floor(1000 + Math.random() * 9000).toString();

  const user = await User.create({
    name,
    email,
    password,
    verificationCode: code,
    verificationCodeExpires: Date.now() + 10 * 60 * 1000, // 10 minutes
    isVerified: false
  });

  if (user) {
    await sendVerificationEmail(user.email, code)
  

    res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    message: "Registration successful. Please check your email for verification code.",
  });
 } else {
  res.status(400).json({ message: "Invalid user data" })
  }
 } catch (error) {
  res.status(500).json({ message: error.message });
 }
};

// 2. NEW FUNCTION: Verify the Code
// export const verifyEmail = async (req, res) => {
//   const { email, code } = req.body;

//   const user = await User.findOne({ 
//     email, 
//     verificationCode: code,
//     verificationCodeExpires: { $gt: Date.now() } // Check if not expired
//   });

//   if (user) {
//     user.isVerified = true;
//     user.verificationCode = undefined; // Clear the code
//     user.verificationCodeExpires = undefined;
//     await user.save();

//     res.status(200).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       token: generateToken(user._id), // Now we give them the token to login
//     });
//   } else {
//     res.status(400).json({ message: "Invalid or expired code" });
//   }
// };

// 3. NEW FUNCTION: Resend the Code

// 3. RESEND CODE (Fixed for Verification-First Flow)
export const resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Check if they are already a full registered user
    // If they are, they shouldn't be here verifying their email.
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Account already registered. Please login." });
    }

    // 2. Generate NEW 4-digit Code
    const newCode = Math.floor(1000 + Math.random() * 9000).toString();

    // 3. Update the TEMPORARY Verification Collection
    // We use findOneAndUpdate to find the email and update the code.
    // upsert: true means "if not found, create it" (safety fallback)
    const updated = await Verification.findOneAndUpdate(
      { email },
      { code: newCode, createdAt: Date.now() },
      { upsert: true, new: true }
    );

    // 4. Send Email
    await sendVerificationEmail(email, newCode);

    res.status(200).json({ message: "New verification code sent" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error sending code" });
  }
};

// STEP 1: INITIATE (User enters email -> We send OTP)
export const verifyEmail = async (req, res) => {
  const { email, } = req.body;

  try {
    // 1. Check if user already exists in MAIN database
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists. Please login." });
    }

    // 2. Generate Code
    const code = Math.floor(1000 + Math.random() * 9000).toString();

    // 3. Store in TEMPORARY Verification Collection
    // Use findOneAndUpdate with upsert to overwrite any old codes for this email
    await Verification.findOneAndUpdate(
      { email },
      { code, createdAt: Date.now() },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // 4. Send Email
    await sendVerificationEmail(email, code);

    res.status(200).json({ message: "Verification code sent to email." });

  } catch (error) {
    res.status(500).json({ message: "Server error sending code." });
  }
};

// userController.js

// NEW: Validate Code (Used in Step 2)
export const validateOTP = async (req, res) => {
  const { email, code } = req.body;

  try {
    const record = await Verification.findOne({ email, code });

    if (!record) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    // Strict 1-Minute Check
    const timeDifference = Date.now() - new Date(record.createdAt).getTime();
    
    // 60 * 1000 ms = 1 Minute
    if (timeDifference > 60 * 1000) {
      return res.status(400).json({ message: "Code has expired" });
    }

    res.status(200).json({ message: "Code is valid" });

  } catch (error) {
    res.status(500).json({ message: "Server validation error" });
  }
};
// STEP 2: COMPLETE (User enters details + OTP code as proof)
export const completeRegistration = async (req, res) => {
  const { name, email, password, code } = req.body;

  try {
    // 1. Verify the OTP from the TEMPORARY collection
    const record = await Verification.findOne({ email, code });

    if (!record) {
      return res.status(400).json({ message: "Invalid or expired verification code." });
    }

    // 2. Create the Real User
    // We set isVerified to true immediately because they just proved it!
    const user = await User.create({
      name,
      email,
      password,
      isVerified: true 
    });

    if (user) {
      // 3. Delete the temporary verification record (Cleanup)
      await Verification.deleteOne({ email });

      // 4. Log them in immediately (Send Token)
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    }

  } catch (error) {
    res.status(500).json({ message: "Registration failed." });
  }
};

// UPDATE USER PROFILE
export const updateUserProfile = async (req, res) => {
  try {
    // req.user comes from your authMiddleware
    const user = await User.findById(req.user._id);

    if (user) {
      // Update Name
      user.name = req.body.name || user.name;
      
      // Update Email (Optional: requires re-verification logic in a real app, 
      // but for now let's allow it or you can comment this line out to lock email)
      if (req.body.email) {
          user.email = req.body.email; 
      }

      // Update Password only if sent
      if (req.body.password) {
        user.password = req.body.password; // The pre-save hook in User model will hash this automatically
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id), // Send a fresh token
      });
      
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// LOGIN
// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });

//   if (!user.isVerified) {
//         return res.status(401).json({ message: "Please verify your email to log in." });
//       }

//   if (user && (await user.matchPassword(password))) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(401).json({ message: "Invalid email or password" });
//   }
// };

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // 1. Check if user exists FIRST
  if (user) {
      
      // 2. NOW check verification
      if (!user.isVerified) {
         return res.status(401).json({ message: "Please verify your email to log in." });
      }

      // 3. Check Password
      if (await user.matchPassword(password)) {
          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
          });
          return;
      }
  }

  // If user doesn't exist OR password fails
  res.status(401).json({ message: "Invalid email or password" });
};

export const getUserProfile = async (req, res) => {
  res.json(req.user);
};

// ... existing imports

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      if (user.isAdmin) {
        return res.status(400).json({ message: 'Cannot delete admin user' }); // Safety check
      }
      await User.deleteOne({ _id: user._id });
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update user (Admin only)
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = async (req, res) => {
  try {
    // 1. Find the user by the ID in the URL (req.params.id), NOT the logged in user
    const user = await User.findById(req.params.id);

    if (user) {
      // 2. Update basic fields only if they are provided
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      
      // 3. THE IMPORTANT PART: Update isAdmin status
      // We check undefined because isAdmin can be 'false'
      if (req.body.isAdmin !== undefined) {
          user.isAdmin = req.body.isAdmin;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
