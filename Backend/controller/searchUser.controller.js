import User from "../models/user.model.js";

export async function searchUsers(req, res) {
  try {
    const searchQuery = req.query.q || "";

    const users = await User.find({
      $or: [
      {username: { $regex: searchQuery, $options: "i" }},
      {profession: {  $regex: searchQuery, $options: "i" }},
      ],
    }).select("-password");

    res.status(200).json({users});
  } catch (e) {
    res.status(500).json({ message: "Search failed", error: e });
  }
}
