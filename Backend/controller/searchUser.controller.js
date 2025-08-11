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
    if (!foundUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json(foundUser);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error", error });
  }
}
