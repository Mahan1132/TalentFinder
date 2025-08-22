import Education from "../models/education.model.js";

// Add Education
export const addEducation = async (req, res) => {
  try {
    const { school, degree, board, address, startDate, endDate, user } =
      req.body;

    // Debug logs
    console.log("req.user:", req.user);
    console.log("req.body:", req.body);

    // Use authenticated user OR fallback to body.user
    const userId = req.user?.id || user;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const newEducation = await Education.create({
      school,
      degree,
      board,
      address,
      startDate: startDate || null, // avoid empty string errors
      endDate: endDate || null,
      user: userId,
    });

    res.status(201).json({ education: newEducation });
  } catch (err) {
    console.error("Add education error:", err);
    res.status(500).json({
      message: "Failed to add education",
      error: err.message, // return actual error for debugging
    });
  }
};

// Get User Education
export const getUserEducation = async (req, res) => {
  try {
    const educations = await Education.find({ user: req.params.userId }).sort({
      startDate: -1,
    });
    res.status(200).json({ educations });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch education", error: err.message });
  }
};

// Delete Education
export const deleteEducation = async (req, res) => {
  try {
    const edu = await Education.findById(req.params.id);
    if (!edu) return res.status(404).json({ message: "Education not found" });

    if (edu.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    await edu.deleteOne();
    res.status(200).json({ message: "Education deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete education" });
  }
};

export const updateEducation = async (req, res) => {
  try {
    const edu = await Education.findById(req.params.id);
    if (!edu) return res.status(404).json({ message: "Education not found" });

    if (edu.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    const updatedEdu = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({ education: updatedEdu });
  } catch (err) {
    res.status(500).json({ message: "Failed to update education" });
  }
};
