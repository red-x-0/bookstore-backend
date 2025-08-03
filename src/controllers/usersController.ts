import { Request, Response } from "express";
import { validateUserUpdate } from "../validation/validateUser";
import userSchema from "../models/userSchema";
import { AuthRequest } from "../types/requestTypes";

/**
 * @desc Get all users (Admin Only)
 * @route GET /users
 * @access Private (Admin)
 */
const users_get = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const users = await userSchema.find().select("-password");
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Error fetching users" });
  }
};

/**
 * @desc Get a single user by ID
 * @route GET /users/:id
 * @access Private (Any Authenticated User)
 */
const user_get = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userSchema.findById(req.params.id).select("-password");

    if (user) {
      res.status(200).json({ success: true, data: user });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, message: "Error fetching user" });
  }
};

/**
 * @desc Update user's own profile
 * @route PUT /users/:id
 * @access Private (User Only)
 */
const user_put = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Validate input data
    const { error } = validateUserUpdate.validate(req.body, { allowUnknown: true, stripUnknown: true });
    if (error) {
      res.status(400).json({ success: false, message: error.details[0].message });
      return;
    }

    // Prevent password update
    if (req.body.password) {
      res.status(400).json({ success: false, message: "Password cannot be updated using this endpoint" });
      return;
    }

    // Update user
    const updatedUser = await userSchema.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).select("-password");

    if (updatedUser) {
      res.status(200).json({ success: true, message: "Profile updated successfully", data: updatedUser });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: "Error updating profile" });
  }
};

/**
 * @desc Delete a user by ID (Admin Only)
 * @route DELETE /users/:id
 * @access Private (Admin)
 */
const user_delete = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const deletedUser = await userSchema.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.status(200).json({ success: true, message: "User deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, message: "Error deleting user" });
  }
};

export { users_get, user_get, user_put, user_delete };
