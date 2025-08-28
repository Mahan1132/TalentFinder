import Experience from "../models/experience.model.js";

export async function addExperience(req, res) {
  try {
    const exp = new Experience({ ...req.body, user: req.user.id });
    await exp.save();
    res.status(201).json({ experience: exp });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Create experience failed", error: e.message });
  }
}

export async function getUserExperiences(req, res) {
  try {
    const list = await Experience.find({ user: req.params.userId }).sort({
      startDate: -1,
    });
    res.json({ experiences: list });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Fetch experiences failed", error: e.message });
  }
}

export async function updateExperience(req, res) {
  try {
    const { id } = req.params; // experience id
    const exp = await Experience.findById(id);
    if (!exp) return res.status(404).json({ message: "Experience not found" });
    if (String(exp.user) !== req.user.id)
      return res.status(403).json({ message: "Forbidden" });

    const allowed = [
      "title",
      "company",
      "location",
      "startDate",
      "endDate",
      "description",
    ];
    for (const k of allowed) if (k in req.body) exp[k] = req.body[k];
    await exp.save();

    res.json({ experience: exp });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Update experience failed", error: e.message });
  }
}

//delete experience
export async function deleteExperience(req, res) {
  try {
    const { id } = req.params;
    const exp = await Experience.findById(id);
    if (!exp) return res.status(404).json({ message: "Experience not found" });
    if (String(exp.user) !== req.user.id)
      return res.status(403).json({ message: "Forbidden" });
    await exp.deleteOne();
    res.json({ message: "Deleted" });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Delete experience failed", error: e.message });
  }
}
