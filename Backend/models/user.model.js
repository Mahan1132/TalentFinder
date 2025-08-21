import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, trim: true, unique: true, required: true },
  email: { type: String, trim: true, unique: true, required: true },
  password: { type: String, required: true },
  profession: String,
  location: String,
  employmentType: {
    type: String,
    enum: ["Freelancer", "Full-time", "Part-time"],
    required: true,
  },
  bio: { type: String, default: "" },
  skills: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  profilePicture: {
    url: {
      type: String,
    },
    public_id: { type: String },
  },
});

const User = model("User", userSchema);
export default User;
