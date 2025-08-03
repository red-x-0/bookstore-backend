import { Request, Response } from "express";
import User from "../models/userSchema";
import { validateUser, validateRegisterUser } from "../validation/validateUser";
import bcrypt from "bcryptjs";

/**
 * @desc Register a new user
 * @route POST /auth/register
 * @access Public
 */
const register = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate user input
    const { error } = validateRegisterUser.validate(req.body);
    if (error) {
      res.status(400).json({ success: false, message: error.details[0].message });
      return;
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(409).json({ success: false, message: "Email is already registered" });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create and save user
    const user = new User({
      ...req.body,
      password: hashedPassword,
    });
    const savedUser = await user.save();

    // Generate JWT
    const token = user.generateAuthToken();

    // Set JWT in cookie (httpOnly for security)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
    });

    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userResponse } = savedUser.toObject();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userResponse,
      token: token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
  }
};

/**
 * @desc Login user
 * @route POST /auth/login
 * @access Public
 */
const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate input data
    const { error } = validateUser.validate(req.body);
    if (error) {
      res.status(400).json({ success: false, message: error.details[0].message });
      return;
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ success: false, message: "Invalid email or password" });
      return;
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: "Invalid email or password" });
      return;
    }

    // Generate JWT
    const token = user.generateAuthToken();

    // Set JWT in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 90 * 24 * 60 * 60 * 1000, // 90 days
    });

    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userResponse } = user.toObject();

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: userResponse,
      token: token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
  }
};

export { 
  register, 
  login 
};
