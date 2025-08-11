import experienceModel from "../models/experience.model.js";

// add new experience
export async function addExperience(req, res) {
  try {
    const newExp = new experienceModel({ ...req.body, user: req.user._id }); //authenticate user Id from token
    await newExp.save();
    res.status(201).json(newExp);
  } catch (error) {
    res.status(500).json({ message: "Error adding experience", error });
  }
}

// get all experiences for a specific user,fetch list of education experiences linked to specific user
export async function getExperienceByUser(req, res) {
  try {
    const { userId } = req.params;
    const experiences = await experienceModel
      .find({ user: userId })
      .sort({ startDate: -1 });
    res.status(200).json(experiences);
  } catch (error) {
    console.error("Error fetching experiences:", error);
    res.status(500).json({ message: "Error fetching experiences", error });
  }
}
