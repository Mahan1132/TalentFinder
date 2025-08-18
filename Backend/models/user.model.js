// import { Schema, model } from "mongoose";

// const userSchema = new Schema({
//   username: String,
//   email: String,
//   password: String,
//   profession: String,
//   location: String,
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const User = model("User", userSchema);
// export default User;

// backend/models/user.model.js
import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, trim: true, unique: true, required: true },
  email: { type: String, trim: true, unique: true, required: true },
  password: { type: String, required: true },
  profession: String,
  location: String,
  bio: { type: String, default: "" },
  skills: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

const User = model("User", userSchema);
export default User;
