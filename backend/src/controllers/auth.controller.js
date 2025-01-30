import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const login = async (req, res) => {
  
  console.log("got a login request!: ", req.body)
  
  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password.' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1h', // Default to 1 hour if not set
    });

    // Return the token and user data (excluding sensitive fields)
    const userResponse = {
      _id: user._id,
      email: user.email,
      name: user.name,
      entryHistory: user.entryHistory,
    };

    res.status(200).json({ token, user: userResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login.' });
  }
};

export const signup = async (req, res) => {
  const { email, name, password } = req.body;

  // Validate input fields
  if (!email || !name || !password) {
    return res.status(400).json({ message: "Invalid signup parameters." });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  // Validate password length and complexity
  if (password.length < 7) {
    return res.status(400).json({ message: "Password must be at least 7 characters long." });
  }

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create a new user
    const newUser = new User({
      email,
      name,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1h', // Default to 1 hour if not set
    });

    // Return the token and user data (excluding sensitive fields)
    const userResponse = {
      _id: newUser._id,
      email: newUser.email,
      name: newUser.name,
      entryHistory: newUser.entryHistory,
    };

    res.status(201).json({ token, user: userResponse });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      // MongoDB duplicate key error (email already exists)
      return res.status(400).json({ message: "Email already exists." });
    }
    res.status(500).json({ message: "Server error during signup." });
  }
};

export const check = (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(400).json({message: "No token provided!"})
}