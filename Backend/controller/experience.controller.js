import experienceModel from "../models/experience.model";

export async function addExperience(req, res) {
  try {
    const newExp = new addExperience({ ...req, body, user: req.user._id });
    await newExp.save();
    res.status(201).json(newExp);
  } catch (error) {
    res.status(500).json({ message: "Error adding experience", error });
  }
}
