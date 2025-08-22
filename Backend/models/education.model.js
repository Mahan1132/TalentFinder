import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true },
    school: { type: String, required: true }, // School/College Name
    board: { type: String },
    address: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Education = mongoose.model("Education", educationSchema);
export default Education;
