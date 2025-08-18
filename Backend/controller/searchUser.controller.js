import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export async function searchUsers(req, res) {
  try {
    const searchQuery = req.query.q || "";

    const users = await User.find({
      $or: [
        { username: { $regex: searchQuery, $options: "i" } },
        { profession: { $regex: searchQuery, $options: "i" } },
      ],
    }).select("-password");

    res.status(200).json({ users });
  } catch (e) {
    res.status(500).json({ message: "Search failed", error: e });
  }
}

//single user ID for profile page, fetch user's profile based on their user Id
export async function getUserId(req, res) {
  try {
    const foundUser = await User.findById(req.params.id).select("-password");
    if (!foundUser) return res.status(404).json({ message: "User not found." });
    const isSelf = req.user?.id === String(foundUser._id);
    res.json({ user: foundUser, isSelf });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error", error });
  }
}

// Update own profile (bio, skills, profession, location, username)
export async function updateUser(req, res) {
  try {
    const userId = req.params.id;
    if (req.user?.id !== userId) {
      return res
        .status(403)
        .json({ message: "Forbidden: cannot update other users" });
    }

    const allowed = ["bio", "skills", "profession", "location", "username"];
    const payload = {};
    for (const key of allowed) {
      if (key in req.body) payload[key] = req.body[key];
    }

    const updated = await User.findByIdAndUpdate(
      userId,
      { $set: payload },
      { new: true }
    ).select("-password");
    res.json({ user: updated });
  } catch (e) {
    res.status(500).json({ message: "Update failed", error: e?.message });
  }
}
